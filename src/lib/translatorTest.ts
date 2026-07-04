import Anthropic from "@anthropic-ai/sdk";

/**
 * Мини-тест на знание языка для анкеты соискателя-переводчика (/perevodchikam).
 * По образцу translateSegmentGraded из translate.ts: tool-use вместо
 * JSON.parse(text) — модель не может вернуть невалидный JSON, а без
 * ANTHROPIC_API_KEY отдаём честный демо-набор вместо ошибки.
 */

export type TestQuestionType =
  | "error_find"
  | "improve"
  | "multiple_choice"
  | "translate"
  | "ambiguity"
  | "editing";

export interface TestQuestion {
  id: number;
  type: TestQuestionType;
  cat: string;
  q: string;
  ex: string | null;
  opts: string[] | null;
  corr: number | null;
}

export interface GeneratedTest {
  mode: "live" | "demo";
  questions: TestQuestion[];
}

const QUESTION_ORDER: TestQuestionType[] = [
  "error_find",
  "improve",
  "multiple_choice",
  "translate",
  "ambiguity",
  "editing",
  "multiple_choice",
  "multiple_choice",
  "multiple_choice",
  "multiple_choice",
];

const CAT_NAMES: Record<TestQuestionType, string> = {
  error_find: "Найди ошибку",
  improve: "Улучши",
  multiple_choice: "Выбор",
  translate: "Перевод",
  ambiguity: "Неоднозначность",
  editing: "Редактура",
};

function demoTest(lang: string): GeneratedTest {
  return {
    mode: "demo",
    questions: QUESTION_ORDER.map((type, i) => ({
      id: i + 1,
      type,
      cat: CAT_NAMES[type],
      q: `[Демо-режим] Пример вопроса №${i + 1} по типу «${CAT_NAMES[type]}» для языка ${lang}. Чтобы генерировать реальные вопросы, задайте ANTHROPIC_API_KEY в окружении сервера.`,
      ex: type === "multiple_choice" ? null : "Пример текста появится здесь в реальном режиме.",
      opts: type === "multiple_choice" ? ["Вариант А", "Вариант Б", "Вариант В", "Вариант Г"] : null,
      corr: type === "multiple_choice" ? 0 : null,
    })),
  };
}

const TEST_TOOL: Anthropic.Tool = {
  name: "submit_test",
  description: "Вернуть 10 вопросов теста для переводчика в строго заданном формате.",
  input_schema: {
    type: "object",
    properties: {
      questions: {
        type: "array",
        minItems: 10,
        maxItems: 10,
        items: {
          type: "object",
          properties: {
            id: { type: "integer" },
            type: {
              type: "string",
              enum: ["error_find", "improve", "multiple_choice", "translate", "ambiguity", "editing"],
            },
            cat: { type: "string", description: "Короткое название категории на русском" },
            q: { type: "string", description: "Формулировка вопроса на русском" },
            ex: { type: "string", description: "Пример/фрагмент текста на исходном языке" },
            opts: {
              type: "array",
              items: { type: "string" },
              description: "4 варианта ответа — только для type=multiple_choice, иначе пустой массив",
            },
            corr: {
              type: "integer",
              description: "Индекс правильного варианта (0-3) для multiple_choice, иначе -1",
            },
          },
          required: ["id", "type", "cat", "q", "ex", "opts", "corr"],
        },
      },
    },
    required: ["questions"],
  },
};

export async function generateTranslatorTest(lang: string): Promise<GeneratedTest> {
  if (!process.env.ANTHROPIC_API_KEY) return demoTest(lang);

  const client = new Anthropic();
  const model = process.env.TRANSLATE_MODEL || "claude-opus-4-8";
  const typeList = QUESTION_ORDER.map((t, i) => `${i + 1}. ${t}`).join("\n");

  const response = await client.messages.create({
    model,
    max_tokens: 3072,
    system:
      "Ты составляешь профессиональный отборочный тест для переводчиков бюро технических переводов Техперевод.com.",
    tools: [TEST_TOOL],
    tool_choice: { type: "tool", name: "submit_test" },
    messages: [
      {
        role: "user",
        content:
          `Составь РОВНО 10 каверзных вопросов для теста переводчика с ${lang} языка на русский, строго в этом порядке типов:\n${typeList}\n\n` +
          `Вопросы (q) — на русском, примеры (ex) — на ${lang}. Для multiple_choice заполни opts (4 варианта) и corr (индекс правильного, 0-3). ` +
          `Для остальных типов opts — пустой массив [], corr — -1.`,
      },
    ],
  });

  const toolUse = response.content.find((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
  const raw = (toolUse?.input as { questions?: unknown[] } | undefined)?.questions;
  if (!Array.isArray(raw) || raw.length !== 10) return demoTest(lang);

  const questions: TestQuestion[] = raw.map((item, i) => {
    const q = item as Record<string, unknown>;
    const type = (QUESTION_ORDER.includes(q.type as TestQuestionType) ? q.type : QUESTION_ORDER[i]) as TestQuestionType;
    const opts = Array.isArray(q.opts) && q.opts.length ? (q.opts as string[]) : null;
    const corrIdx = typeof q.corr === "number" ? q.corr : -1;
    return {
      id: i + 1,
      type,
      cat: typeof q.cat === "string" && q.cat ? q.cat : CAT_NAMES[type],
      q: typeof q.q === "string" ? q.q : "",
      ex: typeof q.ex === "string" && q.ex ? q.ex : null,
      opts: type === "multiple_choice" ? opts : null,
      corr: type === "multiple_choice" && corrIdx >= 0 ? corrIdx : null,
    };
  });

  return { mode: "live", questions };
}

export interface GradedTest {
  mode: "live" | "demo";
  score: number;
  feedback: string;
}

export interface AnsweredQuestion {
  type: TestQuestionType;
  q: string;
  ex: string | null;
  /** Для multiple_choice — текст выбранного варианта; иначе — свободный текстовый ответ. */
  ans: string;
  /** Текст правильного варианта — только для multiple_choice. */
  corr: string | null;
}

const GRADE_TOOL: Anthropic.Tool = {
  name: "submit_grade",
  description: "Вернуть итоговую оценку теста переводчика.",
  input_schema: {
    type: "object",
    properties: {
      score: { type: "integer", minimum: 0, maximum: 100 },
      feedback: { type: "string", description: "3-4 предложения на русском" },
    },
    required: ["score", "feedback"],
  },
};

function demoGrade(qa: AnsweredQuestion[]): GradedTest {
  const mc = qa.filter((q) => q.type === "multiple_choice");
  const correct = mc.filter((q) => q.corr != null && q.ans === q.corr).length;
  const score = mc.length ? Math.round((correct / mc.length) * 100) : 50;
  return {
    mode: "demo",
    score,
    feedback:
      "[Демо-режим] Оценка рассчитана только по вопросам с выбором варианта — текстовые ответы не проверялись. Чтобы включить полную AI-проверку, задайте ANTHROPIC_API_KEY в окружении сервера.",
  };
}

export async function gradeTranslatorTest(lang: string, qa: AnsweredQuestion[]): Promise<GradedTest> {
  if (!process.env.ANTHROPIC_API_KEY) return demoGrade(qa);

  const client = new Anthropic();
  const model = process.env.TRANSLATE_MODEL || "claude-opus-4-8";

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system: "Ты проверяешь отборочный тест переводчика бюро технических переводов Техперевод.com.",
    tools: [GRADE_TOOL],
    tool_choice: { type: "tool", name: "submit_grade" },
    messages: [
      {
        role: "user",
        content:
          `Проверь тест переводчика (${lang} → русский).\n${JSON.stringify(qa, null, 1)}\n\n` +
          `Для multiple_choice ответ верный, если ans совпадает с corr. Для текстовых ответов оцени точность, стиль, естественность перевода.`,
      },
    ],
  });

  const toolUse = response.content.find((b): b is Anthropic.ToolUseBlock => b.type === "tool_use");
  const input = toolUse?.input as { score?: number; feedback?: string } | undefined;
  if (typeof input?.score !== "number" || !input.feedback) return demoGrade(qa);

  return { mode: "live", score: Math.min(100, Math.max(0, Math.round(input.score))), feedback: input.feedback };
}
