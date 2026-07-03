/**
 * Автоматические QA-проверки, сверка с термбазой и маршрутизация "на
 * человека" для отчёта о качестве (см. docs/product-features-plan.md,
 * п.2 и п.3). Честная граница: это только то, что можно посчитать без
 * участия живого редактора — самой правки инженера здесь нет, потому что
 * на платформе пока нет инструмента для редактора. "Маршрутизация" —
 * это решение, какие сегменты ТРЕБУЮТ такой правки, когда инструмент появится;
 * пока это просто явная пометка в отчёте.
 */

export interface QaFlags {
  numbersMismatch: boolean;
  hasNegation: boolean;
  shortSegment: boolean;
  safetyCritical: boolean;
}

// JS's \b is ASCII-only (\w = [A-Za-z0-9_]) and never matches at Cyrillic-letter
// boundaries, so \bне\b silently matches nothing in Russian text — use
// Unicode-property lookaround instead (\p{L} needs the 'u' flag).
const NEGATION_RE =
  /(?<![\p{L}\p{N}])(не|нельзя|запрещ\p{L}*|недопустим\p{L}*|no|not|never|prohibited|must not|do not)(?![\p{L}\p{N}])/iu;
const SAFETY_RE = /опасн\p{L}*|безопасн\p{L}*|осторожно|предупрежд\p{L}*|давлени\p{L}*|напряжени\p{L}*|warning|danger|caution|hazard/iu;
const SHORT_SEGMENT_WORDS = 4;

function extractNumbers(text: string): string[] {
  return (text.match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => n.replace(",", "."));
}

export function computeQaFlags(sourceText: string, aiDraft: string): QaFlags {
  const sourceNumbers = extractNumbers(sourceText);
  const draftNumbers = extractNumbers(aiDraft);
  const numbersMismatch =
    sourceNumbers.length !== draftNumbers.length || sourceNumbers.some((n, i) => n !== draftNumbers[i]);

  return {
    numbersMismatch,
    hasNegation: NEGATION_RE.test(sourceText),
    shortSegment: sourceText.trim().split(/\s+/).filter(Boolean).length <= SHORT_SEGMENT_WORDS,
    safetyCritical: SAFETY_RE.test(sourceText),
  };
}

export function needsReview(flags: QaFlags): boolean {
  return flags.numbersMismatch || flags.hasNegation || flags.safetyCritical;
}

/**
 * Ниже этого порога самооценки модель сама сомневается в переводе — сегмент
 * маршрутизируется на проверку человеком независимо от эвристик. У Anthropic
 * Messages API нет измеренного confidence score — это промпт-based
 * самооценка (см. translateSegmentGraded в src/lib/translate.ts).
 */
export const CONFIDENCE_REVIEW_THRESHOLD = 4;

export function shouldRouteToHuman(flags: QaFlags, confidence: number): boolean {
  return needsReview(flags) || confidence < CONFIDENCE_REVIEW_THRESHOLD;
}

export interface GlossaryHit {
  ru: string;
  en: string;
}

export function matchGlossary(sourceText: string, terms: { ru: string; en: string }[]): GlossaryHit[] {
  const lower = sourceText.toLowerCase();
  return terms.filter((t) => t.ru && lower.includes(t.ru.toLowerCase())).map((t) => ({ ru: t.ru, en: t.en }));
}
