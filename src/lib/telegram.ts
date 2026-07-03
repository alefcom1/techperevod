/**
 * Уведомления о заявках в Telegram — опционально, через Bot API напрямую
 * (без SDK/зависимостей). Пока TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID не заданы
 * в окружении сервера, тихо ничего не делает — заявка всё равно сохраняется
 * в БД и видна в /admin/leads. Включится сам, как только бот будет готов.
 */
export async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
  } catch {
    // Недоступность Telegram не должна ронять сохранение заявки
  }
}
