import { countWords } from "@/lib/translate";
import { parseDocument, type FileKind } from "@/lib/document-parse";

/**
 * Мгновенная оценка документа (см. docs/product-features-plan.md, п.1) —
 * реальный подсчёт слов/сегментов/повторов и цены по уже существующей
 * тарифной ставке редактуры инженером (1,5 ₽/слово, см. WhySection/PricingPlansBody).
 */
export const WORD_RATE_RUB = 1.5;
const WORDS_PER_DAY = 5000;
const MIN_ETA_DAYS = 1;
const REPEAT_DISCOUNT = 0.7; // 100%-совпадающие сегменты считаем по 30% ставки

export interface QuoteSegment {
  index: number;
  text: string;
}

export interface Quote {
  fileKind: FileKind;
  words: number;
  segmentsCount: number;
  repeatPct: number;
  priceRub: number;
  etaDays: number;
  note?: string;
  segments: QuoteSegment[];
}

/** Режем текст на сегменты — по абзацам, длинные абзацы дробим по границам предложений. */
export function splitSegments(text: string): string[] {
  const paragraphs = text
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const segments: string[] = [];
  for (const p of paragraphs) {
    if (p.length <= 220) {
      segments.push(p);
      continue;
    }
    const sentences = p.split(/(?<=[.!?])\s+(?=[A-ZА-ЯЁ0-9])/).map((s) => s.trim()).filter(Boolean);
    segments.push(...(sentences.length ? sentences : [p]));
  }
  return segments;
}

/** Доля слов, приходящихся на точно повторяющиеся (case-insensitive) сегменты. */
function repeatPercent(segments: string[]): number {
  const counts = new Map<string, number>();
  for (const s of segments) {
    const key = s.trim().toLowerCase();
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  let totalWords = 0;
  let repeatedWords = 0;
  for (const s of segments) {
    const w = countWords(s);
    totalWords += w;
    const key = s.trim().toLowerCase();
    if ((counts.get(key) ?? 0) > 1) repeatedWords += w;
  }
  return totalWords > 0 ? (repeatedWords / totalWords) * 100 : 0;
}

export async function buildQuote(buffer: Buffer, fileName: string): Promise<Quote> {
  const { kind, text, note } = await parseDocument(buffer, fileName);
  const segments = splitSegments(text);
  const words = countWords(text);
  const repeatPct = repeatPercent(segments);

  const effectiveWords = words * (1 - (repeatPct / 100) * REPEAT_DISCOUNT);
  const priceRub = Math.round(effectiveWords * WORD_RATE_RUB);
  const etaDays = Math.max(MIN_ETA_DAYS, Math.ceil(words / WORDS_PER_DAY));

  return {
    fileKind: kind,
    words,
    segmentsCount: segments.length,
    repeatPct: Math.round(repeatPct * 10) / 10,
    priceRub,
    etaDays,
    note,
    segments: segments.map((text, index) => ({ index, text })),
  };
}
