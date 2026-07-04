/**
 * Email-уведомления через EmailJS (api.emailjs.com) — по аналогии с
 * telegram.ts: пока EMAILJS_SERVICE_ID/EMAILJS_TEMPLATE_ID/EMAILJS_PUBLIC_KEY
 * не заданы в окружении сервера, тихо ничего не делает; ошибка отправки не
 * должна ронять основной запрос (сохранение заявки в ТМС важнее письма).
 *
 * Серверные (не из браузера) запросы к EmailJS требуют либо приватный ключ
 * (EMAILJS_PRIVATE_KEY, передаётся как accessToken), либо отключённую в
 * настройках EmailJS проверку Origin — см. дашборд EmailJS, Account → Security.
 *
 * Шаблон в EmailJS должен содержать переменные {{to_email}}, {{subject}},
 * {{message}} — именно они передаются ниже как template_params.
 */

const EMAILJS_API = "https://api.emailjs.com/api/v1.0/email/send";

export async function sendMail(opts: { to: string; subject: string; html: string }): Promise<void> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) return;

  try {
    await fetch(EMAILJS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: process.env.EMAILJS_PRIVATE_KEY || undefined,
        template_params: {
          to_email: opts.to,
          subject: opts.subject,
          message: opts.html,
        },
      }),
    });
  } catch {
    // Недоступность EmailJS не должна ронять сохранение заявки
  }
}
