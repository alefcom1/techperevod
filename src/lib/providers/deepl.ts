import { workerBase, workerHeaders } from "@/lib/workerConfig";

/**
 * Адаптер DeepL (/v2/translate через прокси-воркер). DeepL — не LLM: нет
 * системного промпта, нет самооценки уверенности, нет глоссария-в-промпте.
 * Поэтому используется только для plain-перевода (translateText), но НЕ в
 * конвейере заказов с самооценкой (translateSegmentGraded) — там нужен LLM.
 *
 * Роутер (src/lib/modelRouter.ts) ставит DeepL базовым движком для
 * распространённых пар без риск-флагов; пары вне DEEPL_LANG уходят на Claude.
 */

// Наши ISO-коды → коды DeepL. Для target у EN/PT DeepL требует регион;
// для source регион отбрасывается (см. sourceCode ниже). Набор ограничен
// языками, которые реально поддерживает DeepL API.
const DEEPL_LANG: Record<string, string> = {
  ru: "RU",
  en: "EN-US",
  de: "DE",
  fr: "FR",
  es: "ES",
  it: "IT",
  pt: "PT-PT",
  nl: "NL",
  pl: "PL",
  cs: "CS",
  sk: "SK",
  sv: "SV",
  da: "DA",
  fi: "FI",
  el: "EL",
  ro: "RO",
  hu: "HU",
  bg: "BG",
  uk: "UK",
  sl: "SL",
  lt: "LT",
  lv: "LV",
  et: "ET",
  tr: "TR",
  ar: "AR",
  id: "ID",
  ja: "JA",
  ko: "KO",
  zh: "ZH",
  no: "NB",
};

function sourceCode(code: string): string | undefined {
  const mapped = DEEPL_LANG[code];
  return mapped ? mapped.split("-")[0] : undefined;
}

/** Поддерживает ли DeepL эту пару. "auto" как источник допустим (DeepL сам определит). */
export function deeplSupports(source: string, target: string): boolean {
  const targetOk = Boolean(DEEPL_LANG[target]);
  const sourceOk = source === "auto" || Boolean(DEEPL_LANG[source]);
  return targetOk && sourceOk;
}

export async function deeplTranslate(text: string, source: string, target: string): Promise<string> {
  const base = workerBase();
  if (!base) throw new Error("Worker base URL not configured");

  const body: Record<string, unknown> = {
    text: [text],
    target_lang: DEEPL_LANG[target],
  };
  if (source !== "auto") {
    const src = sourceCode(source);
    if (src) body.source_lang = src;
  }

  const res = await fetch(`${base}/deepl/v2/translate`, {
    method: "POST",
    headers: workerHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`DeepL error ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = (await res.json()) as { translations?: { text: string }[] };
  const out = data.translations?.[0]?.text;
  if (typeof out !== "string") throw new Error("DeepL: неожиданный формат ответа");
  return out;
}
