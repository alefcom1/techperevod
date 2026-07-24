/**
 * Реестр PDF-образцов переводов (public/samples/*.pdf, генерируются скриптом
 * scripts/generate-samples.mjs из scripts/samples-data.mjs). Используется
 * блоком «Примеры перевода» на отраслевых и языковых страницах.
 *
 * Все образцы — вымышленные данные с водяным знаком «ПРИМЕР»; стр. 2 каждого
 * PDF — сертификат точности перевода на языке перевода.
 */

export interface SampleDoc {
  file: string; // путь в /public
  docLabel: string; // тип документа по-русски
  pairLabel: string; // видимая пара, напр. «RU → DE»
  targetLang: string; // код языка перевода
  targetLangName: string; // язык перевода по-русски
}

export const SAMPLE_DOCS: SampleDoc[] = [
  { file: "/samples/pasport-bezopasnosti-ru-de.pdf", docLabel: "Паспорт безопасности (SDS)", pairLabel: "RU → DE", targetLang: "de", targetLangName: "немецкий" },
  { file: "/samples/chertezh-ru-en.pdf", docLabel: "Сборочный чертёж", pairLabel: "RU → EN", targetLang: "en", targetLangName: "английский" },
  { file: "/samples/instrukciya-ru-fr.pdf", docLabel: "Руководство по эксплуатации", pairLabel: "RU → FR", targetLang: "fr", targetLangName: "французский" },
  { file: "/samples/katalog-zapchastej-ru-es.pdf", docLabel: "Каталог запчастей", pairLabel: "RU → ES", targetLang: "es", targetLangName: "испанский" },
  { file: "/samples/tu-specifikaciya-ru-it.pdf", docLabel: "ТУ / спецификация", pairLabel: "RU → IT", targetLang: "it", targetLangName: "итальянский" },
  { file: "/samples/reglament-to-ru-pl.pdf", docLabel: "Регламент ТО", pairLabel: "RU → PL", targetLang: "pl", targetLangName: "польский" },
  { file: "/samples/sertifikat-ru-cs.pdf", docLabel: "Сертификат соответствия", pairLabel: "RU → CS", targetLang: "cs", targetLangName: "чешский" },
  { file: "/samples/rukovodstvo-po-ru-nl.pdf", docLabel: "Руководство пользователя ПО", pairLabel: "RU → NL", targetLang: "nl", targetLangName: "нидерландский" },
];

/**
 * Детерминированный выбор 4 образцов для страницы: hash от slug задаёт
 * стартовую позицию, дальше берём подряд по кругу. Так наборы на разных
 * страницах различаются (максимум разнообразия), но стабильны между
 * рендерами (никакого Math.random — важно для SSR/кэша).
 */
export function pickSamples(slug: string, count = 4): SampleDoc[] {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  const start = hash % SAMPLE_DOCS.length;
  const picked: SampleDoc[] = [];
  for (let i = 0; i < Math.min(count, SAMPLE_DOCS.length); i++) {
    picked.push(SAMPLE_DOCS[(start + i) % SAMPLE_DOCS.length]);
  }
  return picked;
}
