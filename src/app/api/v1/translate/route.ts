import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { isKnownLang, translateText, countWords } from "@/lib/translate";
import { checkApiKey, extractBearerToken } from "@/lib/api-keys";

export const runtime = "nodejs";

/**
 * POST /api/v1/translate — публичный документированный REST API (страница
 * /product/api). Тот же оркестратор и та же модель, что у бесплатного
 * виджета на сайте, но с аутентификацией по ключу вместо лимита по IP.
 *
 * Аутентификация: заголовок Authorization: Bearer <ключ>.
 *  - Демо-ключ (см. lib/api-keys.ts) — работает сразу, лимит по IP, ниже.
 *  - Продакшн-ключ (API_LIVE_KEYS в окружении) — лимит по ключу, выше.
 */

const MAX_CHARS = 5000;
const DEMO_DAILY_LIMIT = 20;
const LIVE_DAILY_LIMIT = 200;

// bucket -> { day, count }; bucket = "demo:<ip>" или "live:<key>"
const usage = new Map<string, { day: string; count: number }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0].trim() : req.headers.get("x-real-ip")) || "unknown";
}

function checkLimit(bucket: string, dailyLimit: number): { ok: boolean; remaining: number } {
  const today = new Date().toISOString().slice(0, 10);
  const entry = usage.get(bucket);
  if (!entry || entry.day !== today) {
    usage.set(bucket, { day: today, count: 1 });
    return { ok: true, remaining: dailyLimit - 1 };
  }
  if (entry.count >= dailyLimit) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: dailyLimit - entry.count };
}

export async function POST(req: NextRequest) {
  const token = extractBearerToken(req.headers.get("authorization"));
  const key = checkApiKey(token);
  if (!key.valid) {
    return NextResponse.json(
      {
        error:
          "Неверный или отсутствующий API-ключ. Используйте демо-ключ из документации или запросите продакшн-ключ на /kontakty.",
      },
      { status: 401 },
    );
  }

  let body: { text?: string; source?: string; target?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON в теле запроса" }, { status: 400 });
  }

  const text = (body.text || "").trim();
  const source = body.source === "auto" ? "auto" : isKnownLang(body.source) ? body.source : "ru";
  const target = isKnownLang(body.target) ? body.target : "en";

  if (!text) {
    return NextResponse.json({ error: "Поле text обязательно" }, { status: 400 });
  }
  if (text.length > MAX_CHARS) {
    return NextResponse.json({ error: `Максимум ${MAX_CHARS} символов за запрос` }, { status: 413 });
  }

  const isDemo = key.tier === "demo";
  const bucket = isDemo ? `demo:${clientIp(req)}` : `live:${token}`;
  const dailyLimit = isDemo ? DEMO_DAILY_LIMIT : LIVE_DAILY_LIMIT;
  const limit = checkLimit(bucket, dailyLimit);
  if (!limit.ok) {
    return NextResponse.json(
      {
        error: isDemo
          ? `Дневной лимит демо-ключа (${DEMO_DAILY_LIMIT} запросов) исчерпан. Запросите продакшн-ключ на /kontakty.`
          : `Дневной лимит ключа (${LIVE_DAILY_LIMIT} запросов) исчерпан. Обсудим более высокий лимит на /kontakty.`,
      },
      { status: 429 },
    );
  }

  if (source === target) {
    return NextResponse.json({ translation: text, model: "passthrough", words: countWords(text) });
  }

  try {
    const result = await translateText(text, source, target);
    return NextResponse.json({
      translation: result.translation,
      model: result.mode === "demo" ? "demo" : result.model,
      words: countWords(text),
    });
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
