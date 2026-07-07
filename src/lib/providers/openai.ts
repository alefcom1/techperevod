import { workerBase, workerHeaders } from "@/lib/workerConfig";
import { LANG_NAMES } from "@/data/langs";

/**
 * Адаптер OpenAI (Chat Completions через прокси-воркер). Полноценный LLM:
 * умеет и plain-перевод, и структурированную самооценку через function-calling
 * (аналог tool-use у Anthropic). Роутер использует GPT как кросс-вендорную
 * пере-эскалацию: если Claude на платном тарифе не уверен в сегменте,
 * перепроверяем другим поставщиком (см. maybeEscalate в modelRouter.ts).
 */

/** Модель GPT по умолчанию; переопределяется env OPENAI_TRANSLATE_MODEL. */
export function openaiModel(): string {
  return process.env.OPENAI_TRANSLATE_MODEL || "gpt-4o";
}

const SYSTEM_PLAIN =
  "Ты — профессиональный технический переводчик платформы Техперевод.com. Переводи точно, сохраняя терминологию, форматирование, числа и единицы измерения. Возвращай ТОЛЬКО перевод, без пояснений и преамбул.";

const SYSTEM_GRADED =
  "Ты — профессиональный технический переводчик платформы Техперевод.com. Переводи точно, сохраняя терминологию, форматирование, числа и единицы измерения. После перевода честно самооцени уверенность — низкая оценка не наказывается, она нужна, чтобы направить сегмент на проверку инженеру.";

function userPrompt(text: string, source: string, target: string): string {
  return source === "auto"
    ? `Определи язык исходного текста самостоятельно и переведи его на язык «${LANG_NAMES[target]}»:\n\n${text}`
    : `Переведи с языка «${LANG_NAMES[source]}» на язык «${LANG_NAMES[target]}»:\n\n${text}`;
}

async function chatCompletion(payload: Record<string, unknown>): Promise<Record<string, unknown>> {
  const base = workerBase();
  if (!base) throw new Error("Worker base URL not configured");
  const res = await fetch(`${base}/openai/v1/chat/completions`, {
    method: "POST",
    headers: workerHeaders(),
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`OpenAI error ${res.status}: ${detail.slice(0, 200)}`);
  }
  return res.json();
}

export async function openaiTranslate(text: string, source: string, target: string, model: string): Promise<string> {
  const data = await chatCompletion({
    model,
    max_tokens: 2048,
    messages: [
      { role: "system", content: SYSTEM_PLAIN },
      { role: "user", content: userPrompt(text, source, target) },
    ],
  });
  const choices = data.choices as { message?: { content?: string } }[] | undefined;
  const content = choices?.[0]?.message?.content;
  return typeof content === "string" ? content.trim() : "";
}

export interface OpenAiGraded {
  translation: string;
  confidence: number;
  concerns: string[];
}

const SUBMIT_FUNCTION = {
  type: "function" as const,
  function: {
    name: "submit_translation",
    description: "Вернуть перевод сегмента вместе с самооценкой уверенности.",
    parameters: {
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
          description: "Коротко: что вызывает сомнение. Пустой массив, если сомнений нет.",
        },
      },
      required: ["translation", "confidence", "concerns"],
    },
  },
};

export async function openaiTranslateGraded(
  text: string,
  source: string,
  target: string,
  model: string
): Promise<OpenAiGraded> {
  const data = await chatCompletion({
    model,
    max_tokens: 1024,
    messages: [
      { role: "system", content: SYSTEM_GRADED },
      { role: "user", content: userPrompt(text, source, target) },
    ],
    tools: [SUBMIT_FUNCTION],
    tool_choice: { type: "function", function: { name: "submit_translation" } },
  });

  const choices = data.choices as
    | { message?: { content?: string; tool_calls?: { function?: { arguments?: string } }[] } }[]
    | undefined;
  const rawArgs = choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;

  if (rawArgs) {
    try {
      const parsed = JSON.parse(rawArgs) as Partial<OpenAiGraded>;
      if (typeof parsed.translation === "string") {
        return {
          translation: parsed.translation,
          confidence: Math.min(5, Math.max(1, Math.round(Number(parsed.confidence) || 3))),
          concerns: Array.isArray(parsed.concerns) ? parsed.concerns.filter((c): c is string => typeof c === "string") : [],
        };
      }
    } catch {
      // упадём в фолбэк ниже
    }
  }

  // Модель не вызвала функцию — честно помечаем как требующее проверки.
  const fallback = choices?.[0]?.message?.content;
  return {
    translation: typeof fallback === "string" ? fallback.trim() : "",
    confidence: 1,
    concerns: ["Не удалось получить структурированную самооценку модели"],
  };
}
