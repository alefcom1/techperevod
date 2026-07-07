import { workerBase, workerHeaders } from "@/lib/workerConfig";

/**
 * Адаптер Yandex Translate (Yandex Cloud, /translate/v2/translate через
 * прокси-воркер). NMT, не LLM: нет самооценки — только plain-перевод, не
 * конвейер заказов. Ниша: русское ядро и языки СНГ (лучшее качество на этих
 * парах) + «российский» маршрут под 152-ФЗ (данные не покидают юрисдикцию).
 *
 * folderId — идентификатор каталога Yandex Cloud, обязателен при auth по
 * API-ключу. Не секрет, поэтому берётся из env сайта (YANDEX_FOLDER_ID);
 * сам ключ живёт только в воркере.
 */

// Языки, которые Yandex Translate реально поддерживает (из наших кодов).
// Yandex использует ISO 639-1 в нижнем регистре — совпадает с нашими кодами.
const YANDEX_LANGS = new Set([
  "ru", "en", "de", "fr", "es", "it", "pt", "nl", "pl", "cs", "sk", "sv", "no", "da", "fi",
  "el", "ro", "hu", "bg", "uk", "hr", "sr", "sl", "lt", "lv", "et", "tr", "ar", "he", "fa",
  "hi", "bn", "ur", "ta", "th", "vi", "id", "ms", "ja", "ko", "ka", "hy", "az", "kk", "uz",
  "mn", "sq", "mk", "is",
]);

// Языки СНГ / постсоветского пространства — здесь Yandex особенно силён, а DeepL
// эти пары в основном не поддерживает вовсе.
const CIS_LANGS = new Set(["kk", "uz", "az", "hy", "ka", "uk", "mn"]);

export function yandexSupports(source: string, target: string): boolean {
  const targetOk = YANDEX_LANGS.has(target);
  const sourceOk = source === "auto" || YANDEX_LANGS.has(source);
  return targetOk && sourceOk;
}

/**
 * Стоит ли предпочесть Yandex для этой пары (его ниша): участвует русский
 * язык (русское ядро бюро + 152-ФЗ) или язык СНГ.
 */
export function yandexPreferred(source: string, target: string): boolean {
  const langs = [source, target];
  return langs.includes("ru") || langs.some((l) => CIS_LANGS.has(l));
}

export async function yandexTranslate(text: string, source: string, target: string): Promise<string> {
  const base = workerBase();
  if (!base) throw new Error("Worker base URL not configured");
  const folderId = process.env.YANDEX_FOLDER_ID;
  if (!folderId) throw new Error("YANDEX_FOLDER_ID not configured");

  const body: Record<string, unknown> = {
    folderId,
    texts: [text],
    targetLanguageCode: target,
    format: "PLAIN_TEXT",
  };
  if (source !== "auto") body.sourceLanguageCode = source;

  const res = await fetch(`${base}/yandex/translate/v2/translate`, {
    method: "POST",
    headers: workerHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Yandex error ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = (await res.json()) as { translations?: { text: string }[] };
  const out = data.translations?.[0]?.text;
  if (typeof out !== "string") throw new Error("Yandex: неожиданный формат ответа");
  return out;
}
