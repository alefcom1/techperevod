import { computePreTranslationFlags, shouldRouteToHuman, CONFIDENCE_REVIEW_THRESHOLD, type QaFlags } from "@/lib/quality";

/**
 * "AI-оркестрация" — выбор модели Anthropic под задачу вместо одной модели
 * на все запросы (см. /tarify, /product/orchestrator). Три оси критериев:
 *
 *  1. Тариф — базовый пол/потолок модели (сдерживает расход на бесплатном
 *     и анонимном трафике, отличает уровни подписки).
 *  2. Контент-сигналы — есть готовые эвристики из quality.ts (изначально
 *     собирались для маршрутизации "на редактора"): safetyCritical и
 *     hasNegation считаются ДО перевода по одному исходному тексту и поднимают
 *     модель уже на старте; numbersMismatch известен только ПОСЛЕ черновика —
 *     на нём основана пере-эскалация вторым проходом (см. maybeEscalate).
 *  3. Редкость языковой пары — вне "большой шестёрки" Haiku менее предсказуем,
 *     пол поднимается минимум до Sonnet независимо от тарифа.
 *
 * TRANSLATE_MODEL в окружении остаётся аварийным рубильником уровня
 * инфраструктуры — если задан, перекрывает роутер целиком (см. translate.ts).
 */

export type PlanId = "free" | "start" | "pro" | "business";

export const MODEL_HAIKU = "claude-haiku-4-5-20251001";
export const MODEL_SONNET = "claude-sonnet-5";
export const MODEL_OPUS = "claude-opus-4-8";

const PLAN_FLOOR: Record<PlanId, string> = {
  free: MODEL_HAIKU,
  start: MODEL_HAIKU,
  pro: MODEL_SONNET,
  business: MODEL_OPUS,
};

// Следующая модель по силе — для эскалации. На Opus эскалировать некуда.
const NEXT_MODEL: Record<string, string> = {
  [MODEL_HAIKU]: MODEL_SONNET,
  [MODEL_SONNET]: MODEL_OPUS,
  [MODEL_OPUS]: MODEL_OPUS,
};

// Языковые пары, на которых накоплен основной объём проверенных переводов —
// вне этого набора эскалируем пол по умолчанию (ось 3).
const COMMON_LANGS = new Set(["ru", "en", "de", "zh", "es", "fr"]);

export interface RouteDecision {
  model: string;
  /** Человекочитаемые причины выбора — основа для будущего "объяснения выбора" на Pro. */
  reasons: string[];
}

export interface RouteInput {
  plan: PlanId;
  sourceLang: string;
  targetLang: string;
  sourceText: string;
}

/** Модель для первого прохода — до перевода, только по исходному тексту. */
export function pickInitialModel({ plan, sourceLang, targetLang, sourceText }: RouteInput): RouteDecision {
  let model = PLAN_FLOOR[plan];
  const reasons = [`тариф ${plan}: пол ${model}`];

  // "auto" — язык оригинала ещё не определён, не считаем это редкой парой сам по себе.
  const rarePair = (sourceLang !== "auto" && !COMMON_LANGS.has(sourceLang)) || !COMMON_LANGS.has(targetLang);
  if (rarePair && model === MODEL_HAIKU) {
    model = MODEL_SONNET;
    reasons.push("редкая языковая пара — пол поднят до Sonnet");
  }

  const pre = computePreTranslationFlags(sourceText);
  if (pre.safetyCritical && model !== MODEL_OPUS) {
    model = NEXT_MODEL[model];
    reasons.push("текст помечен как безопасность-критичный");
  } else if (pre.hasNegation && model === MODEL_HAIKU) {
    model = NEXT_MODEL[model];
    reasons.push("текст содержит отрицания/ограничения — риск неверной трактовки");
  }

  return { model, reasons };
}

/**
 * Пере-эскалация вторым проходом ПОСЛЕ первого черновика — когда эвристики
 * (включая numbersMismatch, который известен только сейчас) или собственная
 * неуверенность модели говорят, что сегмент небезопасно оставлять как есть.
 * Только Pro/Business — двойной проход стоит вдвое дороже и дольше, и по
 * умолчанию не должен включаться там, где это не оправдано ценой ошибки.
 * Возвращает null, если эскалация не нужна или модель уже на потолке (Opus).
 */
export function maybeEscalate(
  plan: PlanId,
  currentModel: string,
  flags: QaFlags,
  confidence: number
): RouteDecision | null {
  if (plan !== "pro" && plan !== "business") return null;
  if (currentModel === MODEL_OPUS) return null;
  if (!shouldRouteToHuman(flags, confidence)) return null;

  return {
    model: NEXT_MODEL[currentModel],
    reasons: [
      `пере-эскалация: ${
        confidence < CONFIDENCE_REVIEW_THRESHOLD ? "низкая уверенность модели" : "эвристики отметили сегмент как рискованный"
      }`,
    ],
  };
}
