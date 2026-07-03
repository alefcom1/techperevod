import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

const PLANS = new Set(["free", "start", "pro"]);

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const plan = typeof body?.plan === "string" ? body.plan : "";
  if (!PLANS.has(plan)) return NextResponse.json({ error: "Неизвестный тариф" }, { status: 400 });

  await prisma.user.update({ where: { id: user.id }, data: { plan } });
  return NextResponse.json({ ok: true, plan });
}
