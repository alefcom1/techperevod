/**
 * Доступ к прокси-воркеру для НЕ-Anthropic провайдеров (DeepL, OpenAI).
 *
 * Anthropic ходит через официальный SDK, который сам читает ANTHROPIC_BASE_URL
 * (напр. https://techperevod.vercel.app/api) и ANTHROPIC_AUTH_TOKEN
 * (= PROXY_SECRET воркера). DeepL и OpenAI не имеют такого SDK-механизма,
 * поэтому базовый URL и общий секрет выводятся из тех же двух переменных:
 * все три провайдера — на одном воркере, за одним секретом.
 *
 * Каждый доп. провайдер включается явно через TRANSLATE_PROVIDERS
 * (напр. "deepl,openai"). Пока провайдер не в списке И у воркера нет ключа —
 * роутер его не выбирает, поведение остаётся Claude-only. Это защищает
 * деплой: код можно выкатить раньше, чем в env Vercel добавлены ключи.
 */
export type ExtraProvider = "deepl" | "openai";

/** База воркера (…/api) — из ANTHROPIC_BASE_URL. null, если воркер не настроен. */
export function workerBase(): string | null {
  const base = process.env.ANTHROPIC_BASE_URL;
  return base ? base.replace(/\/$/, "") : null;
}

/** Общий секрет воркера — тот же, что Anthropic SDK шлёт как Bearer. */
export function workerSecret(): string | null {
  return process.env.ANTHROPIC_AUTH_TOKEN || null;
}

export function providerEnabled(provider: ExtraProvider): boolean {
  const list = (process.env.TRANSLATE_PROVIDERS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(provider) && Boolean(workerBase()) && Boolean(workerSecret());
}

/** Заголовки для запроса к воркеру: единый Bearer-секрет. */
export function workerHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${workerSecret() ?? ""}`,
  };
}
