import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createSessionToken, getAdminPassword, verifyPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!getAdminPassword()) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD не задан на сервере — попросите администратора настроить переменную окружения." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!(await verifyPassword(password))) {
    return NextResponse.json({ error: "Неверный пароль" }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
