import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildQuote } from "@/lib/quote";
import { notifyTelegram } from "@/lib/telegram";
import { notifyEmail, type LeadEmailAttachment } from "@/lib/email";
import { notifyTms } from "@/lib/tms";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_BYTES = 10 * 1024 * 1024;
const MAX_FILES = 10;

const URGENCY_LABELS: Record<string, string> = {
  standard: "Стандарт (×1)",
  urgent: "Срочно (×1.5)",
  express: "Экспресс (×2)",
};

/**
 * Приём заявок: классическая форма контактов (одно поле file) и
 * многошаговая форма заказа (несколько files + телефон, срочность,
 * итоговая оценка). Заявка сохраняется в БД, затем уведомления:
 * Telegram, email администратора (с вложениями) и webhook TMS —
 * каждое опционально, по своим env.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });

  // Honeypot: обычный посетитель это поле не видит и не заполняет.
  if (String(form.get("website") ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim() || null;
  const company = String(form.get("company") ?? "").trim() || null;
  const langPair = String(form.get("langPair") ?? "").trim() || null;
  const rawComment = String(form.get("comment") ?? "").trim() || null;
  const urgency = String(form.get("urgency") ?? "").trim() || null;
  const totalRub = Number(form.get("totalRub")) || null;
  const etaDays = Number(form.get("etaDays")) || null;

  if (!name) return NextResponse.json({ error: "Укажите имя" }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Введите корректный email" }, { status: 400 });

  // Файлы: одиночное поле file (форма контактов) + множественное files
  // (форма заказа). Каждый оцениваем buildQuote — цифры идут в заявку.
  const rawFiles = [form.get("file"), ...form.getAll("files")]
    .filter((f): f is File => f instanceof File && f.size > 0)
    .slice(0, MAX_FILES);

  for (const f of rawFiles) {
    if (f.size > MAX_BYTES) {
      return NextResponse.json({ error: `Файл «${f.name}» слишком большой — лимит 10 МБ` }, { status: 400 });
    }
  }

  const attachments: LeadEmailAttachment[] = [];
  const fileSummaries: { name: string; words: number | null; priceRub: number | null }[] = [];
  for (const f of rawFiles) {
    const buffer = Buffer.from(await f.arrayBuffer());
    attachments.push({ filename: f.name, content: buffer });
    try {
      const quote = await buildQuote(buffer, f.name);
      fileSummaries.push({ name: f.name, words: quote.words, priceRub: quote.priceRub });
    } catch {
      // Неизвестный формат — заявка сохраняется, оценку сделает менеджер.
      fileSummaries.push({ name: f.name, words: null, priceRub: null });
    }
  }

  const fileName = fileSummaries.length
    ? fileSummaries.length === 1
      ? fileSummaries[0].name
      : `${fileSummaries[0].name} (+${fileSummaries.length - 1})`
    : null;
  const quoteWords = fileSummaries.reduce<number | null>((acc, f) => (f.words == null ? acc : (acc ?? 0) + f.words), null);
  const quotePriceRub = totalRub ?? fileSummaries.reduce<number | null>((acc, f) => (f.priceRub == null ? acc : (acc ?? 0) + f.priceRub), null);

  // Доп. поля формы заказа складываются в comment — без миграции схемы Lead.
  const extras = [
    phone ? `Телефон: ${phone}` : null,
    urgency ? `Срочность: ${URGENCY_LABELS[urgency] ?? urgency}` : null,
    etaDays ? `Срок: ~${etaDays} раб. дн.` : null,
  ].filter(Boolean);
  const comment = [rawComment, extras.length ? extras.join(" · ") : null].filter(Boolean).join("\n") || null;

  const lead = await prisma.lead.create({
    data: { name, email, company, langPair, comment, fileName, quoteWords, quotePriceRub },
  });

  const summaryLines = [
    `Имя: ${name}`,
    `Email: ${email}`,
    phone ? `Телефон: ${phone}` : null,
    company ? `Компания: ${company}` : null,
    langPair ? `Пара: ${langPair}` : null,
    urgency ? `Срочность: ${URGENCY_LABELS[urgency] ?? urgency}` : null,
    rawComment ? `Комментарий: ${rawComment}` : null,
    ...fileSummaries.map((f) => `Файл: ${f.name}${f.words != null ? ` — ${f.words} слов, ${f.priceRub} ₽` : " (не удалось оценить автоматически)"}`),
    quotePriceRub != null ? `Итого по оценке: ${quotePriceRub} ₽${etaDays ? `, ~${etaDays} раб. дн.` : ""}` : null,
  ].filter(Boolean) as string[];

  void notifyTelegram(["<b>Новая заявка с сайта</b>", ...summaryLines].join("\n"));
  void notifyEmail(`Заявка с techperevod.com: ${name}${quotePriceRub != null ? ` — ${quotePriceRub} ₽` : ""}`, summaryLines.join("\n"), attachments);
  void notifyTms({
    source: "techperevod.com",
    name,
    email,
    phone,
    company,
    langPair,
    urgency,
    comment: rawComment,
    files: fileSummaries,
    totalRub: quotePriceRub,
    etaDays,
    leadId: lead.id,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, leadId: lead.id });
}
