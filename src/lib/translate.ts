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
