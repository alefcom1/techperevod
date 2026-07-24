/**
 * Отправка заявки в TMS (tms.perevod4.ru) — опционально, через webhook.
 * Пока TMS_WEBHOOK_URL не задан в окружении — тихо пропускается, поэтому
 * код можно выкатить раньше, чем согласован формат интеграции.
 *
 * Нужные env (в .env.local сайта):
 *   TMS_WEBHOOK_URL — полный URL эндпоинта приёма заявок в TMS
 *                     (например https://tms.perevod4.ru/api/leads)
 *   TMS_API_KEY     — ключ/токен авторизации; уходит заголовком
 *                     Authorization: Bearer <ключ> и X-Api-Key
 *
 * Формат: POST JSON с плоскими полями заявки (см. TmsLeadPayload). Если у
 * TMS другой контракт (имена полей, метод авторизации) — адаптер меняется
 * в одном месте, здесь.
 */

export interface TmsLeadPayload {
  source: "techperevod.com";
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  langPair?: string | null;
  urgency?: string | null; // standard | urgent | express
  comment?: string | null;
  files?: { name: string; words: number | null; priceRub: number | null }[];
  totalRub?: number | null;
  etaDays?: number | null;
  leadId: string;
  createdAt: string; // ISO
}

export async function notifyTms(payload: TmsLeadPayload): Promise<void> {
  const url = process.env.TMS_WEBHOOK_URL;
  if (!url) return; // интеграция не настроена — молча пропускаем

  const key = process.env.TMS_API_KEY || "";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(key ? { authorization: `Bearer ${key}`, "x-api-key": key } : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[tms] webhook responded ${res.status}: ${(await res.text().catch(() => "")).slice(0, 200)}`);
    }
  } catch (err) {
    // Недоступность TMS не должна ронять сохранение заявки
    console.error("[tms] send failed:", err);
  }
}
