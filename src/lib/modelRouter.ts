import { computePreTranslationFlags, shouldRouteToHuman, CONFIDENCE_REVIEW_THRESHOLD, type QaFlags } from "@/lib/quality";
import { providerEnabled } from "@/lib/workerConfig";
import { deeplSupports } from "@/lib/providers/deepl";
import { openaiModel } from "@/lib/providers/openai";
import { yandexSupports, yandexPreferred } from "@/lib/providers/yandex";

/**
 * "AI-оркестрация" — выбор провайдера И модели под задачу, а не одна модель
 * на все запросы (см. /tarify, /product/orchestrator). Три оси критериев:
 *
 *  1. Тариф — базовый пол модели Claude (сдерживает расход на бесплатном и
 *     анонимном трафике, отличает уровни подписки).
 *  2. Контент-сигналы — эвристики из quality.ts (изначально для маршрутизации
 *     "на редактора"): safetyCritical/hasNegation считаются ДО перевода и
 *     поднимают модель на старте; numbersMismatch/низкая самооценка известны
 *     только ПОСЛЕ черновика и запускают кросс-вендорную пере-эскалацию.
 *  3. Редкость языковой пары — вне "большой шестёрки" пол минимум Sonnet.
 *
 * Провайдеры (при наличии ключей в воркере и TRANSLATE_PROVIDERS):
 *  - Yandex — базовый движок для пар с русским и языками СНГ (лучшее качество
 *    на этих парах + «российский» маршрут под 152-ФЗ). NMT, самооценки нет.
 *  - DeepL — базовый движок для остальных распространённых пар без риск-флагов
 *    (быстро, дёшево, качественно). NMT, самооценки нет.
 *  - Claude — основной LLM: всё, что требует самооценки/контроля, и plain-пары
 *    вне DeepL/Yandex.
 *  - GPT — кросс-вендорная пере-эскалация: если Claude не уверен, перепроверяем
 *    другим поставщиком.
 *
 * NMT-движки (Yandex, DeepL) не берут safety-critical и не идут в конвейер
 * заказов — там нужна самооценка, значит LLM.
 *
 * TRANSLATE_MODEL в окружении — аварийный рубильник: если задан, translate.ts
 * форсит Anthropic + эту модель, минуя роутер целиком.
 */

export type Provider = "anthropic" | "openai" | "deepl" | "yandex";
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

const NEXT_MODEL: Record<string, string> = {
  [MODEL_HAIKU]: MODEL_SONNET,
  [MODEL_SONNET]: MODEL_OPUS,
  [MODEL_OPUS]: MODEL_OPUS,
};

const COMMON_LANGS = new Set(["ru", "en", "de", "zh", "es", "fr"]);

export interface RouteDecision {
  provider: Provider;
  model: string;
  /** Человекочитаемые причины — основа для "объяснения выбора" на Pro. */
  reasons: string[];
}

export interface RouteInput {
  plan: PlanId;
  sourceLang: string;
  targetLang: string;
  sourceText: string;
}

/** Пол Claude по тарифу с поправкой на редкую пару и риск-флаги. */
function claudeFloor(input: RouteInput): RouteDecision {
  let model = PLAN_FLOOR[input.plan];
  const reasons = [`тариф ${input.plan}: ${model}`];

  const rarePair =
    (input.sourceLang !== "auto" && !COMMON_LANGS.has(input.sourceLang)) || !COMMON_LANGS.has(input.targetLang);
  if (rarePair && model === MODEL_HAIKU) {
    model = MODEL_SONNET;
    reasons.push("редкая языковая пара — пол поднят до Sonnet");
  }

  const pre = computePreTranslationFlags(input.sourceText);
  if (pre.safetyCritical && model !== MODEL_OPUS) {
    model = NEXT_MODEL[model];
    reasons.push("текст помечен как безопасность-критичный");
  } else if (pre.hasNegation && model === MODEL_HAIKU) {
    model = NEXT_MODEL[model];
    reasons.push("текст содержит отрицания/ограничения — риск неверной трактовки");
  }

  return { provider: "anthropic", model, reasons };
}

/**
 * Движок для plain-перевода (виджет на сайте, embed-виджет, публичный API) —
 * самооценка не нужна. DeepL как база для распространённых безопасных пар,
 * иначе Claude по тарифу.
 */
export function pickPlainEngine(input: RouteInput): RouteDecision {
  const pre = computePreTranslationFlags(input.sourceText);
  const risky = pre.safetyCritical || pre.hasNegation;

  if (!risky) {
    // Yandex — приоритет для русского ядра и пар СНГ (качество + 152-ФЗ).
    if (
      providerEnabled("yandex") &&
      yandexPreferred(input.sourceLang, input.targetLang) &&
      yandexSupports(input.sourceLang, input.targetLang)
    ) {
      return { provider: "yandex", model: "yandex", reasons: ["пара с русским/СНГ — движок Yandex (качество + 152-ФЗ)"] };
    }
    // DeepL — остальные распространённые пары.
    if (providerEnabled("deepl") && deeplSupports(input.sourceLang, input.targetLang)) {
      return { provider: "deepl", model: "deepl", reasons: ["распространённая пара — базовый движок DeepL"] };
    }
  }
  return claudeFloor(input);
}

/**
 * Модель для первого прохода конвейера заказов — нужна самооценка, поэтому
 * только LLM Claude (DeepL исключён по построению).
 */
export function pickGradedInitial(input: RouteInput): RouteDecision {
  return claudeFloor(input);
}

/**
 * Пере-эскалация после первого черновика: если эвристики (включая
 * numbersMismatch) или самооценка говорят "рискованно", и тариф это окупает
 * (Pro/Business) — перепроверяем более сильной моделью. Если подключён
 * OpenAI, это ДРУГОЙ поставщик (GPT) — честная кросс-вендорная перепроверка;
 * иначе следующая по силе модель Claude. Возвращает null, если эскалация не
 * нужна или Claude уже на потолке (Opus) и GPT недоступен.
 */
export function maybeEscalate(
  plan: PlanId,
  current: RouteDecision,
  flags: QaFlags,
  confidence: number
): RouteDecision | null {
  if (plan !== "pro" && plan !== "business") return null;
  if (!shouldRouteToHuman(flags, confidence)) return null;

  const lowConfidence = confidence < CONFIDENCE_REVIEW_THRESHOLD;
  const why = lowConfidence ? "низкая уверенность модели" : "эвристики отметили сегмент как рискованный";

  if (providerEnabled("openai")) {
    return { provider: "openai", model: openaiModel(), reasons: [`перепроверка другим поставщиком (GPT): ${why}`] };
  }

  if (current.provider === "anthropic" && current.model !== MODEL_OPUS) {
    return { provider: "anthropic", model: NEXT_MODEL[current.model], reasons: [`пере-эскалация Claude: ${why}`] };
  }

  return null;
}
