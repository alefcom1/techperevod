import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { SITE_EMAIL } from "@/data/site";

export const runtime = "nodejs";

const TMS_API = process.env.TRANSLATOR_TMS_API_URL || "https://tms.perevod4.ru/api/v1";
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

interface LanguageEntry {
  lang: string;
  level: string;
}

/**
 * Анкета соискателя-переводчика (/perevodchikam). Пересылает заявку в
 * ТМС бюро (tms.perevod4.ru — см. docs интеграции) и дублирует уведомление
 * на почту. Оба канала — как и просил заказчик; ТМС остаётся источником
 * истины по статусу заявки (pending/approved/...), почта — просто копия.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  // Honeypot: обычный посетитель это поле не видит и не заполняет.
  if (String(body.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const lastName = String(body.last_name ?? "").trim();
  const firstName = String(body.first_name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const languages: LanguageEntry[] = Array.isArray(body.languages) ? body.languages : [];

  if (!lastName || !firstName) return NextResponse.json({ error: "Укажите имя и фамилию" }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "Введите корректный email" }, { status: 400 });
  if (!languages.length) return NextResponse.json({ error: "Укажите хотя бы один язык" }, { status: 400 });

  const payload = {
    website: "",
    last_name: lastName,
    first_name: firstName,
    middle_name: body.middle_name || null,
    birth_date: body.birth_date || null,
    phone: body.phone || null,
    email,
    languages,
    test_scores: null,
    employment_type: body.employment_type || null,
    work_type: body.work_type || null,
    workload: body.workload || null,
    productivity: body.productivity || null,
    urgent_works: body.urgent_works || null,
    urgency_concept: body.urgency_concept || null,
    salary_level: body.salary_level || null,
    punctuality: typeof body.punctuality === "number" ? body.punctuality : null,
    pc_skills: body.pc_skills || null,
    cat_tools: body.cat_tools || null,
    diploma_path: body.diploma_path || null,
    comment: body.comment || null,
  };

  let tmsResult: { id?: string; status?: string } = {};
  try {
    const tmsRes = await fetch(`${TMS_API}/applications/translator`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (tmsRes.status === 429) {
      return NextResponse.json({ error: "Слишком много заявок. Повторите через час." }, { status: 429 });
    }
    if (!tmsRes.ok) {
      return NextResponse.json({ error: `Ошибка ТМС: ${tmsRes.status}` }, { status: 502 });
    }
    tmsResult = await tmsRes.json().catch(() => ({}));
  } catch {
    return NextResponse.json({ error: "ТМС недоступна. Попробуйте позже." }, { status: 502 });
  }

  void sendMail({
    to: process.env.TRANSLATOR_NOTIFY_EMAIL || SITE_EMAIL,
    subject: `Новая анкета переводчика: ${firstName} ${lastName}`,
    html: [
      `<p><b>Новая анкета соискателя-переводчика</b></p>`,
      `<p>Имя: ${firstName} ${lastName}${payload.middle_name ? ` ${payload.middle_name}` : ""}<br>`,
      `Email: ${email}<br>`,
      payload.phone ? `Телефон: ${payload.phone}<br>` : "",
      `Языки: ${languages.map((l) => `${l.lang} (${l.level})`).join(", ")}<br>`,
      payload.employment_type ? `Занятость: ${payload.employment_type}<br>` : "",
      payload.salary_level ? `Ожидания по оплате: ${payload.salary_level}<br>` : "",
      payload.diploma_path ? `Диплом/сертификат: <a href="${payload.diploma_path}">${payload.diploma_path}</a><br>` : "",
      payload.comment ? `Комментарий: ${payload.comment}<br>` : "",
      `</p>`,
      `<p>ID заявки в ТМС: ${tmsResult.id || "—"}</p>`,
    ].join(""),
  });

  return NextResponse.json({ ok: true, id: tmsResult.id, status: tmsResult.status });
}
