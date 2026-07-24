import nodemailer from "nodemailer";

/**
 * Отправка заявок на почту администратора — опционально, через SMTP.
 * Пока SMTP_* переменные не заданы в окружении — тихо пропускается (как
 * notifyTelegram), поэтому код можно выкатить раньше, чем настроен ящик.
 *
 * Нужные env (в .env.local сайта):
 *   SMTP_HOST     — хост SMTP-сервера (например smtp.yandex.ru / smtp.gmail.com)
 *   SMTP_PORT     — порт (465 для SSL, 587 для STARTTLS)
 *   SMTP_USER     — логин ящика-отправителя
 *   SMTP_PASS     — пароль приложения (не основной пароль аккаунта!)
 *   LEADS_EMAIL_TO — куда слать заявки (по умолчанию alefcom1@gmail.com)
 */

export interface LeadEmailAttachment {
  filename: string;
  content: Buffer;
}

export async function notifyEmail(subject: string, text: string, attachments: LeadEmailAttachment[] = []): Promise<void> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return; // SMTP не настроен — молча пропускаем

  const port = Number(process.env.SMTP_PORT) || 465;
  const to = process.env.LEADS_EMAIL_TO || "alefcom1@gmail.com";

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from: `"Техперевод.com" <${user}>`,
      to,
      subject,
      text,
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content })),
    });
  } catch (err) {
    // Недоступность почты не должна ронять сохранение заявки
    console.error("[email] send failed:", err);
  }
}
