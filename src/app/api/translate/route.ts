import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";

/**
 * POST /api/translate — бесплатный переводчик (уровень Free воронки).
 *
 * Лимиты Free-уровня: до MAX_CHARS символов за запрос, DAILY_LIMIT запросов
 * в день с одного IP (in-memory — достаточно для одного PM2-процесса; при
 * масштабировании заменить на Redis).
 *
 * Провайдер: Anthropic API (модель задаётся TRANSLATE_MODEL, по умолчанию
 * claude-opus-4-8). Если ANTHROPIC_API_KEY не задан на сервере, маршрут
 * работает в демо-режиме: возвращает mode:"demo" и UI честно показывает
 * плашку «демо» вместо перевода.
 */

const MAX_CHARS = 2000;
// Автоперевод в UI (дебаунс при наборе) расходует больше запросов — лимит выше
const DAILY_LIMIT = 30;

const LANG_NAMES: Record<string, string> = {
  ru: "русский",
  en: "английский",
  de: "немецкий",
  zh: "китайский",
  es: "испанский",
  fr: "французский",
};

// ip -> { day, count }
const usage = new Map<string, { day: string; count: number }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0].trim() : req.headers.get("x-real-ip")) || "unknown";
}

function checkLimit(ip: string): { ok: boolean; remaining: number } {
  const today = new Date().toISOString().slice(0, 10);
  const entry = usage.get(ip);
  if (!entry || entry.day !== today) {
    usage.set(ip, { day: today, count: 1 });
    return { ok: true, remaining: DAILY_LIMIT - 1 };
  }
  if (entry.count >= DAILY_LIMIT) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: DAILY_LIMIT - entry.count };
}

export async function POST(req: NextRequest) {
  let body: { text?: string; source?: string; target?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const text = (body.text || "").trim();
  // source: "auto" — модель сама определяет язык оригинала
  const source = body.source === "auto" ? "auto" : body.source && LANG_NAMES[body.source] ? body.source : "ru";
  const target = body.target && LANG_NAMES[body.target] ? body.target : "en";

  if (!text) {
    return NextResponse.json({ error: "Пустой текст" }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return NextResponse.json(
      { error: `Бесплатный перевод — до ${MAX_CHARS} символов. Для больших объёмов оформите подписку.` },
      { status: 413 }
    );
  }
  if (source === target) {
    return NextResponse.json({ translation: text, mode: "live", remaining: DAILY_LIMIT });
  }

  const ip = clientIp(req);
  const limit = checkLimit(ip);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Дневной лимит бесплатных переводов исчерпан. Зарегистрируйтесь или оформите подписку.", limitReached: true },
      { status: 429 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    // Демо-режим: ключ не настроен на сервере. Возвращаем честную заглушку.
    return NextResponse.json({
      mode: "demo",
      translation:
        "[Демо-режим] Здесь появится перевод. Чтобы включить реальный AI-перевод, задайте ANTHROPIC_API_KEY в окружении сервера.",
      remaining: limit.remaining,
    });
  }

  try {
    const client = new Anthropic();
    const model = process.env.TRANSLATE_MODEL || "claude-opus-4-8";
    const response = await client.messages.create({
      model,
      max_tokens: 2048,
      system:
        "Ты — профессиональный технический переводчик платформы techperevod.com. Переводи точно, сохраняя терминологию, форматирование, числа и единицы измерения. Возвращай ТОЛЬКО перевод, без пояснений и преамбул.",
      messages: [
        {
          role: "user",
          content:
            source === "auto"
              ? `Определи язык исходного текста самостоятельно и переведи его на язык «${LANG_NAMES[target]}»:\n\n${text}`
              : `Переведи с языка «${LANG_NAMES[source]}» на язык «${LANG_NAMES[target]}»:\n\n${text}`,
        },
      ],
    });

    const translation = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return NextResponse.json({ mode: "live", translation, remaining: limit.remaining });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Сервис перегружен, попробуйте через минуту." }, { status: 503 });
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ error: "Ошибка сервиса перевода. Попробуйте позже." }, { status: 502 });
    }
    return NextResponse.json({ error: "Внутренняя ошибка. Попробуйте позже." }, { status: 500 });
  }
}
