import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth";
import { isKnownLang, translateText } from "@/lib/translate";
import { computeQaFlags, needsReview as flagsNeedReview, matchGlossary } from "@/lib/quality";

export const runtime = "nodejs";

// Синхронная генерация черновика по сегментам — держим границу разумной,
// пока в проекте нет очереди фоновых задач. Для больших документов честно
// просим написать нам вместо тихого обрезания заказа.
const MAX_SEGMENTS_SYNC = 40;
const BATCH_SIZE = 5;

/**
 * Превращает сохранённую оценку (Order + Segment) в реальный AI-черновик по
 * сегментам с автоматическими QA-проверками и сверкой с термбазой —
 * "отчёт о качестве" из плана (п.2), без выдуманной правки живого редактора.
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { segments: { orderBy: { index: "asc" } } },
  });
  if (!order || order.userId !== user.id) {
    return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
  }
  if (order.segments.length === 0) {
    return NextResponse.json(
      { error: "У этой оценки нет сохранённых сегментов — загрузите документ заново из кабинета." },
      { status: 422 },
    );
  }
  if (order.segments.length > MAX_SEGMENTS_SYNC) {
    return NextResponse.json(
      {
        error: `Документ слишком большой для мгновенного черновика (${order.segments.length} сегментов, лимит ${MAX_SEGMENTS_SYNC}). Напишите нам — оформим таким заказом вручную.`,
      },
      { status: 422 },
    );
  }
  if (!isKnownLang(order.sourceLang) && order.sourceLang !== "auto") {
    return NextResponse.json({ error: "Неизвестный язык оригинала" }, { status: 422 });
  }
  if (!isKnownLang(order.targetLang)) {
    return NextResponse.json({ error: "Неизвестный язык перевода" }, { status: 422 });
  }

  const glossaryTerms = await prisma.glossaryTerm.findMany({ where: { userId: user.id } });

  const segments = order.segments;
  for (let i = 0; i < segments.length; i += BATCH_SIZE) {
    const batch = segments.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (segment) => {
        const { translation } = await translateText(segment.sourceText, order.sourceLang, order.targetLang);
        const flags = computeQaFlags(segment.sourceText, translation);
        const hits = matchGlossary(segment.sourceText, glossaryTerms);
        await prisma.segment.update({
          where: { id: segment.id },
          data: {
            aiDraft: translation,
            qaFlags: JSON.stringify(flags),
            glossaryHits: JSON.stringify(hits),
            needsReview: flagsNeedReview(flags),
          },
        });
      }),
    );
  }

  const updated = await prisma.order.update({
    where: { id: order.id },
    data: { status: "ai_draft" },
    include: { segments: { orderBy: { index: "asc" } } },
  });

  return NextResponse.json({ order: updated });
}
