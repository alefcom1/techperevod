import https from "node:https";
import Anthropic from "@anthropic-ai/sdk";
import { LANG_NAMES, isKnownLang } from "@/data/langs";
import type { Provider } from "@/lib/modelRouter";
import { deeplTranslate } from "@/lib/providers/deepl";
import { openaiTranslate, openaiTranslateGraded } from "@/lib/providers/openai";
import { yandexTranslate } from "@/lib/providers/yandex";

/**
 * Между вызовами serverless-функция "замораживается"; keep-alive соединение
 * к воркеру (ANTHROPIC_BASE_URL) может к следующему вызову оказаться уже
 * разорвано удалённой стороной — тогда запрос виснет/падает ECONNRESET
 * (та же причина, что чинили в самом воркере при обращении к Anthropic).
 * keepAlive: false — каждый запрос идёт по свежему соединению.
 */
const noKeepAliveAgent = new https.Agent({ keepAlive: false });
function newAnthropicClient(): Anthropic {
  return new Anthropic({ httpAgent: noKeepAliveAgent });
}

/**
 * Общее ядро AI-перевода — используется внутренним /api/translate (виджет),
 * embed-виджетом, публичным /api/v1/translate и конвейером заказов. Провайдер
 * и модель приходят от роутера (src/lib/modelRouter.ts); здесь только
 * диспетчеризация вызова к нужному поставщику.
 */

export { LANG_NAMES, isKnownLang };

/** Выбор оркестратора: какой провайдер и модель выполнят перевод. */
export interface EngineChoice {
  provider: Provider;
  model: string;
}

export interface TranslateResult {
  mode: "live" | "demo";
  translation: string;
  provider?: Provider;
  model?: string;
}

/**
 * Есть ли у сервера учётные данные для реальных вызовов. Anthropic SDK читает
 * ANTHROPIC_API_KEY либо ANTHROPIC_BASE_URL+ANTHROPIC_AUTH_TOKEN (прокси-воркер);
 * DeepL/OpenAI ходят через тот же воркер (общий секрет), поэтому наличие
 * воркер-креденшелов = живой режим для всех провайдеров.
 */
function hasAnthropicCreds(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

const DEMO_TEXT =
  "[Демо-режим] Здесь появится перевод. Чтобы включить реальный AI-перевод, задайте ANTHROPIC_API_KEY (или ANTHROPIC_BASE_URL + ANTHROPIC_AUTH_TOKEN для прокси-воркера) в окружении сервера.";

/**
 * TRANSLATE_MODEL — аварийный рубильник: если задан, форсит Anthropic + эту
 * модель на все запросы, минуя роутер. Иначе — выбор оркестратора (choice),
 * иначе Anthropic + Opus по умолчанию.
 */
function resolveEngine(choice?: EngineChoice): EngineChoice {
  const forced = process.env.TRANSLATE_MODEL;
  if (forced) return { provider: "anthropic", model: forced };
  return choice ?? { provider: "anthropic", model: "claude-opus-4-8" };
}

function buildUserPrompt(text: string, source: string, target: string): string {
  return source === "auto"
    ? `Определи язык исходного текста самостоятельно и переведи его на язык «${LANG_NAMES[target]}»:\n\n${text}`
    : `Переведи с языка «${LANG_NAMES[source]}» на язык «${LANG_NAMES[target]}»:\n\n${text}`;
}

/**
 * Переводит text с source на target. source === "auto" — модель сама
 * определяет исходный язык. Без учётных данных возвращает честную демо-заглушку.
 *
 * Бросает Anthropic.RateLimitError / Anthropic.APIError (и Error от DeepL/OpenAI)
 * при сбое провайдера — вызывающий код сам решает, как превратить в HTTP-ответ.
 */
export async function translateText(
  text: string,
  source: string,
  target: string,
  choice?: EngineChoice
): Promise<TranslateResult> {
  if (!hasAnthropicCreds()) {
    return { mode: "demo", translation: DEMO_TEXT };
  }

  const engine = resolveEngine(choice);

  if (engine.provider === "deepl") {
    const translation = await deeplTranslate(text, source, target);
    return { mode: "live", translation, provider: "deepl", model: "deepl" };
  }

  if (engine.provider === "yandex") {
    const translation = await yandexTranslate(text, source, target);
    return { mode: "live", translation, provider: "yandex", model: "yandex" };
  }

  if (engine.provider === "openai") {
    const translation = await openaiTranslate(text, source, target, engine.model);
    return { mode: "live", translation, provider: "openai", model: engine.model };
  }

  const client = newAnthropicClient();
  const response = await client.messages.create({
    model: engine.model,
    max_tokens: 2048,
    system:
      "Ты — профессиональный технический переводчик платформы Техперевод.com. Переводи точно, сохраняя терминологию, форматирование, числа и единицы измерения. Возвращай ТОЛЬКО перевод, без пояснений и преамбул.",
    messages: [{ role: "user", content: buildUserPrompt(text, source, target) }],
  });

  const translation = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  return { mode: "live", translation, provider: "anthropic", model: engine.model };
}

/** Простой подсчёт слов для полей вида "words" в ответах API. */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export interface GradedTranslation {
  translation: string;
  /** Самооценка модели, 1 (совсем не уверена) – 5 (уверена полностью). */
  confidence: number;
  /** Короткие пометки, на что стоит обратить внимание при проверке — если есть. */
  concerns: string[];
  /** Провайдер и модель, фактически выполнившие перевод. */
  provider: Provider;
  model: string;
}

const SUBMIT_TOOL: Anthropic.Tool = {
  name: "submit_translation",
  description: "Вернуть перевод сегмента вместе с самооценкой уверенности.",
  input_schema: {
    type: "object",
    properties: {
      translation: { type: "string", description: "Перевод исходного текста" },
      confidence: {
        type: "integer",
        minimum: 1,
        maximum: 5,
        description: "Насколько ты уверена в точности перевода: 1 — совсем не уверена, 5 — уверена полностью",
      },
      concerns: {
        type: "array",
        items: { type: "string" },
        description: "Коротко: что именно вызывает сомнение (термин, число, неоднозначность). Пустой массив, если сомнений нет.",
      },
    },
    required: ["translation", "confidence", "concerns"],
  },
};

/**
 * Как translateText, но с самооценкой уверенности — для конвейера заказов
 * (см. /api/orders/[id]/translate). DeepL сюда не попадает (не умеет
 * самооценку); провайдер — Anthropic или OpenAI (кросс-вендорная эскалация).
 * У Messages API нет токен-уровневого confidence — это промпт-based
 * самооценка, честно обозначенная как таковая везде, где показывается.
 */
export async function translateSegmentGraded(
  text: string,
  source: string,
  target: string,
  choice?: EngineChoice
): Promise<GradedTranslation> {
  const engine = resolveEngine(choice);

  if (!hasAnthropicCreds()) {
    return { translation: DEMO_TEXT, confidence: 3, concerns: [], provider: engine.provider, model: engine.model };
  }

  if (engine.provider === "openai") {
    const graded = await openaiTranslateGraded(text, source, target, engine.model);
    return { ...graded, provider: "openai", model: engine.model };
  }

  const client = newAnthropicClient();
  const response = await client.messages.create({
    model: engine.model,
    max_tokens: 1024,
    system:
      "Ты — профессиональный технический переводчик платформы Техперевод.com. Переводи точно, сохраняя терминологию, форматирование, числа и единицы измерения. После перевода честно самооцени уверенность — низкая оценка не наказывается, она нужна, чтобы направить сегмент на проверку инженеру.",
    tools: [SUBMIT_TOOL],
    tool_choice: { type: "tool", name: "submit_translation" },
    messages: [{ role: "user", content: buildUserPrompt(text, source, target) }],
  });

  const toolUse = response.content.find((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
  const input = toolUse?.input as Partial<GradedTranslation> | undefined;

  if (!input?.translation) {
    const fallbackText = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    return {
      translation: fallbackText || "",
      confidence: 1,
      concerns: ["Не удалось получить структурированную самооценку модели"],
      provider: "anthropic",
      model: engine.model,
    };
  }

  const confidence = Math.min(5, Math.max(1, Math.round(Number(input.confidence) || 3)));
  return {
    translation: input.translation,
    confidence,
    concerns: Array.isArray(input.concerns) ? input.concerns.filter((c): c is string => typeof c === "string") : [],
    provider: "anthropic",
    model: engine.model,
  };
}
