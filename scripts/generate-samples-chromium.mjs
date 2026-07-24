/**
 * Chromium-генератор PDF-образцов для письменностей, которые pdfkit не умеет
 * верстать корректно: иврит (RTL/BiDi) и деванагари/хинди (сложный шейпинг),
 * а также китайский (CJK-шрифт). Chromium делает и BiDi, и шейпинг, и
 * подстановку шрифтов, поэтому эти образцы рендерим через headless-браузер.
 *
 * Запуск (вручную, при изменении данных):
 *   node scripts/generate-samples-chromium.mjs
 * Обрабатываются только записи SAMPLE_DOCS с renderer === "chromium".
 * Шрифты (Noto Sans SC / Hebrew / Devanagari + DejaVu) должны быть
 * установлены в системе на момент генерации (fc-cache); в PDF Chromium
 * встраивает только использованные глифы — в репозиторий шрифты не кладём.
 *
 * Вёрстка визуально повторяет pdfkit-образцы (шапка, синяя линия, водяной
 * знак «ПРИМЕР», сертификат на стр. 2, колонтитул).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { SAMPLE_DOCS, CERT_TEXTS, WATERMARK_BY_LANG } from "./samples-data.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT_DIR = path.join(ROOT, "public/samples");

const BRAND = {
  name: "www.techperevod.com",
  tagline: "Бюро технических переводов · AI-оркестрация + редактура инженером",
  email: "info@techperevod.com",
  phone: "+7 495 970-44-13",
};

/** Шрифтовой стек для тела перевода по языку письменности. */
const BODY_FONT = {
  he: "'Noto Sans Hebrew', 'DejaVu Sans'",
  hi: "'Noto Sans Devanagari', 'DejaVu Sans'",
  zh: "'Noto Sans SC', 'DejaVu Sans'",
};

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function renderBody(body) {
  let html = "";
  for (const block of body) {
    if (block.h) html += `<h3 class="h">${esc(block.h)}</h3>`;
    if (block.p) html += `<p class="p">${esc(block.p)}</p>`;
    if (block.rows) {
      html += `<table class="rows">`;
      for (const [k, v] of block.rows) {
        html += `<tr><td class="k">${esc(k)}</td><td class="v">${esc(v)}</td></tr>`;
      }
      html += `</table>`;
    }
  }
  return html;
}

function pageChrome(inner, { watermarkLabel, pageNo }) {
  return `
  <section class="page">
    <div class="wm"><span>${esc(watermarkLabel)}</span></div>
    <header class="hdr">
      <div class="hdr-row">
        <div class="brand">${esc(BRAND.name)}</div>
        <div class="contacts">${esc(BRAND.email)} · ${esc(BRAND.phone)}</div>
      </div>
      <div class="tagline">${esc(BRAND.tagline)}</div>
      <div class="rule"></div>
    </header>
    <main class="body">${inner}</main>
    <footer class="ftr">${esc(BRAND.name)} — образец перевода · стр. ${pageNo}/2</footer>
  </section>`;
}

function buildHtml(sample) {
  const { targetLang, docTitle, translatedTitle, sourceNote, body, dir } = sample;
  const cert = CERT_TEXTS[targetLang];
  const wm = `ПРИМЕР · ${WATERMARK_BY_LANG[targetLang] ?? "SAMPLE"}`;
  const bodyFont = BODY_FONT[targetLang] ?? "'DejaVu Sans'";
  const rtl = dir === "rtl";

  const page1Inner = `
    <p class="note">${esc(sourceNote)}</p>
    <h2 class="title">${esc(translatedTitle)}</h2>
    <div class="doc-body ${rtl ? "rtl" : ""}">${renderBody(body)}</div>`;

  const certSubtitle = esc(cert.subtitle(docTitle));
  const page2Inner = `
    <h1 class="cert-title">${esc(cert.title)}</h1>
    <p class="cert-sub">${esc(certSubtitle)}</p>
    <div class="cert-body ${rtl ? "rtl" : ""}">
      ${cert.paragraphs.map((p) => `<p class="cert-p">${esc(p)}</p>`).join("")}
    </div>
    <div class="sign">
      <div class="sign-col">
        <div class="sign-line"></div>
        <div class="sign-lbl">${esc(cert.signatureLabel)}</div>
      </div>
      <div class="date-col">
        <div class="sign-line"></div>
        <div class="sign-lbl">${esc(cert.dateLabel)}</div>
      </div>
    </div>`;

  return `<!doctype html><html><head><meta charset="utf-8"><style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body { font-family: 'DejaVu Sans', 'Noto Sans SC'; color: #111; }
    .page {
      position: relative; width: 210mm; height: 297mm; padding: 14mm 15mm 12mm;
      page-break-after: always; overflow: hidden;
    }
    .page:last-child { page-break-after: auto; }
    .hdr-row { display: flex; justify-content: space-between; align-items: baseline; }
    .brand { color: #1f5eff; font-weight: 700; font-size: 15px; }
    .contacts { color: #555; font-size: 8.5px; }
    .tagline { color: #555; font-size: 8.5px; margin-top: 2px; }
    .rule { border-bottom: 1.4px solid #1f5eff; margin-top: 6px; }
    .body { margin-top: 12px; font-size: 9.5px; line-height: 1.5; }
    .note { color: #555; font-size: 9px; margin: 0 0 8px; }
    .title { font-size: 14px; font-weight: 700; margin: 0 0 10px; }
    .doc-body { font-family: ${bodyFont}; }
    .doc-body.rtl { direction: rtl; text-align: right; }
    .h { font-size: 10.5px; font-weight: 700; margin: 10px 0 4px; }
    .p { font-size: 9.5px; margin: 0 0 6px; line-height: 1.5; }
    table.rows { width: 100%; border-collapse: collapse; margin: 0 0 8px; }
    table.rows td { vertical-align: top; padding: 1.5px 0; font-size: 9px; }
    td.k { width: 42%; font-weight: 700; padding-right: 10px; }
    .doc-body.rtl td.k { padding-right: 0; padding-left: 10px; }
    .cert-title { font-size: 15px; font-weight: 700; text-align: center; margin: 28px 0 4px; }
    .cert-sub { font-size: 9.5px; color: #555; text-align: center; margin: 0 0 22px; }
    .cert-body { font-family: ${bodyFont}; }
    .cert-body.rtl { direction: rtl; text-align: right; }
    .cert-p { font-size: 9.5px; line-height: 1.6; text-align: justify; margin: 0 0 9px; }
    .sign { display: flex; justify-content: space-between; margin-top: 32px; }
    .sign-col { width: 46%; } .date-col { width: 40%; text-align: right; }
    .sign-line { border-top: 0.8px solid #555; }
    .sign-lbl { font-size: 8.5px; color: #555; margin-top: 4px; }
    .ftr {
      position: absolute; left: 0; right: 0; bottom: 8mm;
      text-align: center; color: #888; font-size: 8px;
    }
    .wm {
      position: absolute; inset: 0; display: flex; align-items: center;
      justify-content: center; pointer-events: none; z-index: 0;
    }
    .wm span {
      transform: rotate(-34deg); font-size: 64px; font-weight: 700;
      color: #1f5eff; opacity: 0.08; white-space: nowrap;
      font-family: 'DejaVu Sans';
    }
    .hdr, .body, .ftr { position: relative; z-index: 1; }
  </style></head><body>
    ${pageChrome(page1Inner, { watermarkLabel: wm, pageNo: 1 })}
    ${pageChrome(page2Inner, { watermarkLabel: wm, pageNo: 2 })}
  </body></html>`;
}

const docs = SAMPLE_DOCS.filter((d) => d.renderer === "chromium");
if (!docs.length) {
  console.log("Нет образцов с renderer:\"chromium\" — нечего генерировать.");
  process.exit(0);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage();
let count = 0;
for (const sample of docs) {
  if (!CERT_TEXTS[sample.targetLang]) throw new Error(`Нет сертификата для ${sample.targetLang}`);
  const html = buildHtml(sample);
  await page.setContent(html, { waitUntil: "networkidle" });
  const file = path.join(OUT_DIR, `${sample.docSlug}-${sample.sourceLang}-${sample.targetLang}.pdf`);
  await page.pdf({ path: file, format: "A4", printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
  console.log(`✓ ${path.relative(ROOT, file)}`);
  count++;
}
await browser.close();
console.log(`Готово: ${count} PDF (Chromium) в public/samples/`);
