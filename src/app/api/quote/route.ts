import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildQuote } from "@/lib/quote";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024; // 10 МБ

/**
 * Мгновенная оценка документа — принимает файл, парсит его, считает
 * слова/сегменты/повторы и сохраняет заказ в БД со статусом "quote".
 * Анонимные оценки (виджет на сайте) сохраняются без userId.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: "Файл пуст" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Файл слишком большой — лимит 10 МБ для мгновенной оценки" }, { status: 400 });
  }

  const source = typeof form?.get("source") === "string" ? String(form.get("source")) : "ru";
  const target = typeof form?.get("target") === "string" ? String(form.get("target")) : "en";

  const buffer = Buffer.from(await file.arrayBuffer());

  let quote;
  try {
    quote = await buildQuote(buffer, file.name);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message || "Не удалось разобрать файл" }, { status: 422 });
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);

  // Текст сегментов сохраняем только для авторизованных пользователей — он
  // нужен, чтобы потом сгенерировать AI-черновик в кабинете. Анонимные оценки
  // с публичного виджета не хранят содержимое документа, только цифры.
  const order = await prisma.order.create({
    data: {
      userId: user?.id,
      fileName: file.name,
      fileKind: quote.fileKind,
      sourceLang: source,
      targetLang: target,
      words: quote.words,
      segmentsCount: quote.segmentsCount,
      repeatPct: quote.repeatPct,
      priceRub: quote.priceRub,
      etaDays: quote.etaDays,
      note: quote.note,
      status: "quote",
      ...(user
        ? {
            segments: {
              create: quote.segments.map((s) => ({ index: s.index, sourceText: s.text })),
            },
          }
        : {}),
    },
  });

  return NextResponse.json({
    orderId: order.id,
    fileKind: quote.fileKind,
    words: quote.words,
    segmentsCount: quote.segmentsCount,
    repeatPct: quote.repeatPct,
    priceRub: quote.priceRub,
    etaDays: quote.etaDays,
    note: quote.note,
  });
}
