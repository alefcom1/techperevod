import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildQuote } from "@/lib/quote";
import { notifyTelegram } from "@/lib/telegram";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });

  // Honeypot: обычный посетитель это поле не видит и не заполняет.
  if (String(form.get("website") ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const company = String(form.get("company") ?? "").trim() || null;
  const langPair = String(form.get("langPair") ?? "").trim() || null;
  const comment = String(form.get("comment") ?? "").trim() || null;

  if (!name) return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Введите корректный email" }, { status: 400 });

  let fileName: string | null = null;
  let quoteWords: number | null = null;
  let quotePriceRub: number | null = null;

  const file = form.get("file");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Файл слишком большой — лимит 10 МБ" }, { status: 400 });
    }
    fileName = file.name;
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      const quote = await buildQuote(buffer, file.name);
      quoteWords = quote.words;
      quotePriceRub = quote.priceRub;
    } catch {
      // Не удалось разобрать файл (неизвестный формат и т.п.) — заявка всё
      // равно сохраняется, просто без автоматической оценки по вложению.
    }
  }

  const lead = await prisma.lead.create({
    data: { name, email, company, langPair, comment, fileName, quoteWords, quotePriceRub },
  });

  const lines = [
    "<b>Новая заявка с сайта</b>",
    `Имя: ${name}`,
    `Email: ${email}`,
    company ? `Компания: ${company}` : null,
    langPair ? `Пара: ${langPair}` : null,
    comment ? `Комментарий: ${comment}` : null,
    fileName ? `Файл: ${fileName}` : null,
    quoteWords != null ? `Оценка: ${quoteWords} слов, ${quotePriceRub} ₽` : null,
  ].filter(Boolean);
  void notifyTelegram(lines.join("\n"));

  return NextResponse.json({ ok: true, leadId: lead.id });
}
