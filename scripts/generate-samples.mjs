/**
 * Генератор PDF-примеров переводов для блока «Примеры перевода» на
 * отраслевых и языковых страницах (см. docs/solutions-plan.md, задача 2).
 *
 * Запуск (вручную, при изменении данных):
 *   node scripts/generate-samples.mjs
 * Вывод: public/samples/{docSlug}-{src}-{tgt}.pdf
 *
 * Каждый PDF: стр. 1 — «перевод» (шапка бюро, заголовок, текст перевода на
 * целевом языке), стр. 2 — сертификат точности перевода на языке перевода
 * (по отраслевому образцу: заявление о точности, описание документа и пары,
 * подпись представителя бюро). На каждой странице — диагональный водяной
 * знак «ПРИМЕР / SAMPLE»: это витринные образцы, не боевые документы.
 *
 * Данные образцов: scripts/samples-data.mjs (фрагменты переводов готовятся
 * заранее и проверяются редактором — генератор только верстает).
 */
import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SAMPLE_DOCS, CERT_TEXTS, WATERMARK_BY_LANG } from "./samples-data.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const FONT = path.join(ROOT, "assets/fonts/DejaVuSans.ttf");
const FONT_BOLD = path.join(ROOT, "assets/fonts/DejaVuSans-Bold.ttf");
const OUT_DIR = path.join(ROOT, "public/samples");

const BRAND = {
  name: "www.techperevod.com",
  tagline: "Бюро технических переводов · AI-оркестрация + редактура инженером",
  site: "https://techperevod.com",
  email: "info@techperevod.com",
  phone: "+7 495 970-44-13",
};

const A4 = { width: 595.28, height: 841.89 };
const M = 56; // поля

/** Диагональный водяной знак на текущей странице. */
function watermark(doc, targetLang) {
  const label = `ПРИМЕР · ${WATERMARK_BY_LANG[targetLang] ?? "SAMPLE"}`;
  doc.save();
  doc.rotate(-34, { origin: [A4.width / 2, A4.height / 2] });
  doc.font(FONT_BOLD).fontSize(64).fillColor("#1f5eff").fillOpacity(0.08);
  doc.text(label, 0, A4.height / 2 - 40, { width: A4.width, align: "center" });
  doc.restore();
  doc.fillOpacity(1).fillColor("#111");
}

/** Фирменная шапка страницы. */
function header(doc) {
  doc.font(FONT_BOLD).fontSize(15).fillColor("#1f5eff").text(BRAND.name, M, 40, { lineBreak: false });
  doc.font(FONT).fontSize(8.5).fillColor("#555").text(BRAND.tagline, M, 60, { lineBreak: false });
  doc
    .fontSize(8.5)
    .fillColor("#555")
    .text(`${BRAND.email} · ${BRAND.phone}`, M, 44, { width: A4.width - 2 * M, align: "right", lineBreak: false });
  doc.moveTo(M, 78).lineTo(A4.width - M, 78).lineWidth(1.2).strokeColor("#1f5eff").stroke();
  doc.fillColor("#111");
}

/** Нижний колонтитул с номером страницы. */
function footer(doc, pageNo, totalPages) {
  // pdfkit добавляет автостраницу, если текст попадает ниже нижнего поля —
  // временно обнуляем поле, чтобы колонтитул не создавал страницу 3/4.
  const saved = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  doc
    .font(FONT)
    .fontSize(8)
    .fillColor("#888")
    .text(`${BRAND.name} — образец перевода · стр. ${pageNo}/${totalPages}`, M, A4.height - 42, {
      width: A4.width - 2 * M,
      align: "center",
      lineBreak: false,
    });
  doc.page.margins.bottom = saved;
  doc.fillColor("#111");
}

function generateOne(sample) {
  const { docSlug, sourceLang, targetLang, docTitle, translatedTitle, sourceNote, body } = sample;
  const cert = CERT_TEXTS[targetLang];
  if (!cert) throw new Error(`Нет текстов сертификата для языка ${targetLang}`);

  const file = path.join(OUT_DIR, `${docSlug}-${sourceLang}-${targetLang}.pdf`);
  const doc = new PDFDocument({ size: "A4", margins: { top: 96, bottom: 60, left: M, right: M }, autoFirstPage: false });
  doc.pipe(fs.createWriteStream(file));

  // ── Стр. 1: перевод ────────────────────────────────────────────────────
  doc.addPage();
  header(doc);
  doc.font(FONT).fontSize(9).fillColor("#555").text(sourceNote, M, 96, { width: A4.width - 2 * M });
  doc.moveDown(0.6);
  doc.font(FONT_BOLD).fontSize(14).fillColor("#111").text(translatedTitle, M, doc.y, { width: A4.width - 2 * M });
  doc.moveDown(0.8);

  for (const block of body) {
    if (block.h) {
      doc.moveDown(0.4);
      doc.font(FONT_BOLD).fontSize(10.5).text(block.h, M, doc.y, { width: A4.width - 2 * M });
      doc.moveDown(0.2);
    }
    if (block.p) {
      doc.font(FONT).fontSize(9.5).text(block.p, M, doc.y, { width: A4.width - 2 * M, lineGap: 2 });
    }
    if (block.rows) {
      // Простая двухколоночная таблица «параметр — значение»
      for (const [k, v] of block.rows) {
        const y = doc.y;
        doc.font(FONT_BOLD).fontSize(9).text(k, M, y, { width: 200 });
        const yAfterKey = doc.y;
        doc.font(FONT).fontSize(9).text(v, M + 210, y, { width: A4.width - 2 * M - 210 });
        doc.y = Math.max(yAfterKey, doc.y);
        doc.moveDown(0.15);
      }
      doc.moveDown(0.3);
    }
  }
  watermark(doc, targetLang);
  footer(doc, 1, 2);

  // ── Стр. 2: сертификат точности на языке перевода ─────────────────────
  doc.addPage();
  header(doc);
  doc.moveDown(1.2);
  doc.font(FONT_BOLD).fontSize(15).text(cert.title, M, 110, { width: A4.width - 2 * M, align: "center" });
  doc.moveDown(0.3);
  doc.font(FONT).fontSize(9.5).fillColor("#555").text(cert.subtitle(docTitle, sourceLang, targetLang), M, doc.y, { width: A4.width - 2 * M, align: "center" });
  doc.moveDown(1.4);
  doc.fillColor("#111");
  for (const para of cert.paragraphs) {
    doc.font(FONT).fontSize(9.5).text(para, M, doc.y, { width: A4.width - 2 * M, lineGap: 2.5, align: "justify" });
    doc.moveDown(0.6);
  }
  doc.moveDown(1.6);
  // Подпись представителя бюро
  const sigY = doc.y;
  doc.moveTo(M, sigY + 28).lineTo(M + 190, sigY + 28).lineWidth(0.8).strokeColor("#555").stroke();
  doc.font(FONT).fontSize(8.5).fillColor("#555").text(cert.signatureLabel, M, sigY + 32, { width: 190 });
  doc.font(FONT).fontSize(8.5).text(cert.dateLabel, A4.width - M - 150, sigY + 32, { width: 150, align: "right" });
  doc.moveTo(A4.width - M - 150, sigY + 28).lineTo(A4.width - M, sigY + 28).stroke();

  watermark(doc, targetLang);
  footer(doc, 2, 2);

  doc.end();
  return file;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
let count = 0;
for (const sample of SAMPLE_DOCS) {
  const file = generateOne(sample);
  count++;
  console.log(`✓ ${path.relative(ROOT, file)}`);
}
console.log(`Готово: ${count} PDF в public/samples/`);
