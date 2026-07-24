/**
 * Отправка заявки в TMS (tms.perevod4.ru) — публичный REST API,
 * https://tms.perevod4.ru/api/v1/docs/api. Опционально: пока TMS_API_KEY
 * не задан в окружении — тихо пропускается, код можно выкатить раньше,
 * чем настроена интеграция.
 *
 * Нужные env (в .env.local сайта):
 *   TMS_API_KEY — ключ вида tms_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *                 (Настройки → API-ключи в TMS)
 *
 * POST /orders создаёт заказ, если указаны language_pair И service_type И
 * они есть в каталоге TMS — иначе создаётся просто заявка (lead), которую
 * дальше обрабатывает менеджер. Поэтому даже без точного соответствия
 * каталогу запрос не считается ошибочным.
 *
 * TMS_SERVICE_TYPE — опционально: точное название/UUID услуги из каталога
 * TMS (GET /catalog → service_types[].name/.id). Без него service_type не
 * передаётся, и TMS создаёт заявку (lead) вместо полноценного заказа —
 * это безопасный дефолт, раз соответствие каталогу не гарантировано.
 */

const BASE_URL = "https://tms.perevod4.ru/api/v1/public";

export interface TmsOrderPayload {
  contactName: string;
  contactEmail: string;
  contactPhone?: string | null;
  title: string;
  comment?: string | null;
  languagePair?: string | null; // код из /catalog, напр. "en-ru"
  deadline?: string | null; // ISO 8601
  sourceRef: string; // наш leadId — для дедупликации при повторной отправке
}

export async function notifyTms(payload: TmsOrderPayload): Promise<void> {
  const apiKey = process.env.TMS_API_KEY;
  if (!apiKey) return; // интеграция не настроена — молча пропускаем

  const serviceType = process.env.TMS_SERVICE_TYPE || undefined;

  const body: Record<string, unknown> = {
    contact: {
      name: payload.contactName,
      email: payload.contactEmail,
      ...(payload.contactPhone ? { phone: payload.contactPhone } : {}),
    },
    title: payload.title,
    source_ref: payload.sourceRef,
  };
  if (payload.comment) body.comment = payload.comment;
  if (payload.languagePair) body.language_pair = payload.languagePair;
  if (serviceType) body.service_type = serviceType;
  if (payload.deadline) body.deadline = payload.deadline;

  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`[tms] POST /orders responded ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
    }
  } catch (err) {
    // Недоступность TMS не должна ронять сохранение заявки
    console.error("[tms] send failed:", err);
  }
}
