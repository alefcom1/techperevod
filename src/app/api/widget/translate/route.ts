import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isKnownLang, translateText } from "@/lib/translate";
import { corsHeaders, hashText } from "@/lib/widget";
import { pickPlainEngine, type PlanId } from "@/lib/modelRouter";

const PLAN_IDS: PlanId[] = ["free", "start", "pro", "business"];
function toPlanId(plan: string | undefined): PlanId {
  return plan && (PLAN_IDS as string[]).includes(plan) ? (plan as PlanId) : "free";
}

export const runtime = "nodejs";

const MAX_TEXTS = 100;
const MAX_TEXT_LEN = 600;
const DAILY_LIMIT_PER_SITE = 5000;

// В памяти процесса, как и остальные лимиты в проекте (см. src/app/api/v1/translate/route.ts) —
// обнуляется при рестарте PM2, для реального масштабирования нужен Redis.
const usage = new Map<string, { day: string; count: number }>();

function checkAndConsume(siteId: string, n: number): boolean {
  const day = new Date().toISOString().slice(0, 10);
  const entry = usage.get(siteId);
  const count = entry && entry.day === day ? entry.count : 0;
  if (count + n > DAILY_LIMIT_PER_SITE) return false;
  usage.set(siteId, { day, count: count + n });
  return true;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

/**
 * Публичный эндпоинт, который дёргает сам виджет с ЧУЖОГО домена (см.
 * public/widget.js) — поэтому CORS открыт всем (*), а не ограничен нашим
 * сайтом. Аутентификация — siteKey в теле запроса, он не секрет (публично
 * встраивается в HTML клиента), доверие тут такое же, как у DEMO_API_KEY
 * в /api/v1/translate.
 */
export async function POST(request: NextRequest) {
  const headers = corsHeaders();
  const body = await request.json().catch(() => null);

  const siteKey = typeof body?.siteKey === "string" ? body.siteKey : "";
  const url = typeof body?.url === "string" ? body.url : "";
  const lang = typeof body?.lang === "string" ? body.lang : "";
  const texts = Array.isArray(body?.texts) ? body.texts.filter((t: unknown): t is string => typeof t === "string") : [];

  if (!siteKey || !url || !isKnownLang(lang) || texts.length === 0) {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400, headers });
  }
  if (texts.length > MAX_TEXTS) {
    return NextResponse.json({ error: `Слишком много фрагментов за раз (лимит ${MAX_TEXTS})` }, { status: 400, headers });
  }

  const site = await prisma.widgetSite.findUnique({ where: { siteKey }, include: { user: true } });
  if (!site) return NextResponse.json({ error: "Неизвестный siteKey" }, { status: 401, headers });
  const plan = toPlanId(site.user?.plan);

  const targetLangs = JSON.parse(site.targetLangs) as string[];
  if (lang !== site.sourceLang && !targetLangs.includes(lang)) {
    return NextResponse.json({ error: "Этот язык не настроен для сайта" }, { status: 400, headers });
  }

  if (!checkAndConsume(site.id, texts.length)) {
    return NextResponse.json({ error: "Дневной лимит переводов для сайта исчерпан" }, { status: 429, headers });
  }

  // Язык оригинала — просто отдаём исходный текст без похода к модели.
  if (lang === site.sourceLang) {
    return NextResponse.json({ translations: texts }, { headers });
  }

  const clipped = texts.map((t: string) => (t.length > MAX_TEXT_LEN ? t.slice(0, MAX_TEXT_LEN) : t));
  const hashes = clipped.map(hashText);

  const cached = await prisma.widgetTranslation.findMany({
    where: { siteId: site.id, targetLang: lang, textHash: { in: hashes } },
  });
  const cacheByHash = new Map(cached.map((c) => [c.textHash, c.translation]));

  const results: string[] = new Array(clipped.length);
  const misses: { index: number; text: string; hash: string }[] = [];
  clipped.forEach((text: string, i: number) => {
    const hit = cacheByHash.get(hashes[i]);
    if (hit != null) results[i] = hit;
    else misses.push({ index: i, text, hash: hashes[i] });
  });

  for (const miss of misses) {
    const engine = pickPlainEngine({ plan, sourceLang: site.sourceLang, targetLang: lang, sourceText: miss.text });
    const { translation } = await translateText(miss.text, site.sourceLang, lang, engine);
    results[miss.index] = translation;
    await prisma.widgetTranslation
      .upsert({
        where: { siteId_targetLang_textHash: { siteId: site.id, targetLang: lang, textHash: miss.hash } },
        create: { siteId: site.id, pageUrl: url, targetLang: lang, textHash: miss.hash, sourceText: miss.text, translation },
        update: {},
      })
      .catch(() => {
        // гонка при параллельных запросах на один и тот же новый хэш — не критично, кэш уже есть
      });
  }

  return NextResponse.json({ translations: results }, { headers });
}
