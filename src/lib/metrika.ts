/**
 * Безопасная обёртка над целями Яндекс.Метрики. Счётчик монтируется в корневом
 * layout (см. components/analytics/YandexMetrika.tsx); здесь только отправка
 * целей из клиентских компонентов. Если счётчик ещё не загрузился или код
 * выполняется на сервере — вызов тихо игнорируется.
 */

const METRIKA_ID = 110336524;

export function reachGoal(name: string): void {
  if (typeof window === "undefined") return;
  const ym = (window as unknown as { ym?: (id: number, method: string, goal: string) => void }).ym;
  if (typeof ym !== "function") return;
  try {
    ym(METRIKA_ID, "reachGoal", name);
  } catch {
    // Метрика заблокирована или не инициализирована — не мешаем работе UI
  }
}
