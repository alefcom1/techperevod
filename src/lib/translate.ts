import Anthropic from "@anthropic-ai/sdk";

/**
 * Общее ядро AI-перевода — используется и внутренним /api/translate
 * (бесплатный виджет на сайте, лимит по IP), и публичным /api/v1/translate
 * (документированный REST API, лимит по ключу). Модель и системный промпт
 * одни и те же — качество перевода не отличается между виджетом и API.
 */

export const LANG_NAMES: Record<string, string> = {
  ru: "русский",
  en: "английский",
  de: "немецкий",
  zh: "китайский",
  es: "испанский",
  fr: "французский",
};

export function isKnownLang(code: string | undefined): code is keyof typeof LANG_NAMES {
  return !!code && code in LANG_NAMES;
}

export interface TranslateResult {
  mode: "live" | "demo";
  translation: string;
  model?: string;
}

/**
 * Переводит text с source на target. source === "auto" — модель сама
 * определяет исходный язык. Если ANTHROPIC_API_KEY не задан на сервере,
 * возвращает честную демо-заглушку (mode: "demo") вместо ошибки.
 *
 * Бросает Anthropic.RateLimitError / Anthropic.APIError при сбое провайдера —
 * вызывающий код сам решает, как их превратить в HTTP-ответ.
 */
export async function translateText(text: string, source: string, target: string): Promise<TranslateResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      mode: "demo",
      translation:
        "[Демо-режим] Здесь появится перевод. Чтобы включить реальный AI-перевод, задайте ANTHROPIC_API_KEY в окружении сервера.",
    };
  }

  const client = new Anthropic();
  const model = process.env.TRANSLATE_MODEL || "claude-opus-4-8";
  const response = await client.messages.create({
    model,
    max_tokens: 2048,
    system:
      "Ты — профессиональный технический переводчик платформы Техперевод.com. Переводи точно, сохраняя терминологию, форматирование, числа и единицы измерения. Возвращай ТОЛЬКО перевод, без пояснений и преамбул.",
    messages: [
      {
        role: "user",
        content:
          source === "auto"
            ? `Определи язык исходного текста самостоятельно и переведи его на язык «${LANG_NAMES[target]}»:\n\n${text}`
            : `Переведи с языка «${LANG_NAMES[source]}» на язык «${LANG_NAMES[target]}»:\n\n${text}`,
      },
    ],
  });

  const translation = response.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  return { mode: "live", translation, model };
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
 * Как translateText, но для конвейера заказов (см. /api/orders/[id]/translate):
 * модель дополнительно самооценивает уверенность в переводе сегмента — это
 * входные данные для маршрутизации "на человека" (см. src/lib/quality.ts).
 * У Anthropic Messages API нет токен-уровневого confidence score, поэтому
 * это промпт-based самооценка, а не измеренная величина — честно обозначено
 * как таковая везде, где показывается пользователю.
 */
export async function translateSegmentGraded(text: string, source: string, target: string): Promise<GradedTranslation> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      translation:
        "[Демо-режим] Здесь появится перевод. Чтобы включить реальный AI-перевод, задайте ANTHROPIC_API_KEY в окружении сервера.",
      confidence: 3,
      concerns: [],
    };
  }

  const client = new Anthropic();
  const model = process.env.TRANSLATE_MODEL || "claude-opus-4-8";
  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system:
      "Ты — профессиональный технический переводчик платформы Техперевод.com. Переводи точно, сохраняя терминологию, форматирование, числа и единицы измерения. После перевода честно самооцени уверенность — низкая оценка не наказывается, она нужна, чтобы направить сегмент на проверку инженеру.",
    tools: [SUBMIT_TOOL],
    tool_choice: { type: "tool", name: "submit_translation" },
    messages: [
      {
        role: "user",
        content:
          source === "auto"
            ? `Определи язык исходного текста самостоятельно и переведи его на язык «${LANG_NAMES[target]}»:\n\n${text}`
            : `Переведи с языка «${LANG_NAMES[source]}» на язык «${LANG_NAMES[target]}»:\n\n${text}`,
      },
    ],
  });

  const toolUse = response.content.find((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
  const input = toolUse?.input as Partial<GradedTranslation> | undefined;

  if (!input?.translation) {
    // Модель не вызвала инструмент (редко, но возможно) — не выдаём это за
    // высокую уверенность, честно помечаем как требующее проверки.
    const fallbackText = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    return {
      translation: fallbackText || "",
      confidence: 1,
      concerns: ["Не удалось получить структурированную самооценку модели"],
    };
  }

  const confidence = Math.min(5, Math.max(1, Math.round(Number(input.confidence) || 3)));
  return {
    translation: input.translation,
    confidence,
    concerns: Array.isArray(input.concerns) ? input.concerns.filter((c): c is string => typeof c === "string") : [],
  };
}
