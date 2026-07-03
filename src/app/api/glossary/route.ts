import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

async function requireUser(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  return getSessionUser(token);
}

export async function GET(request: NextRequest) {
  const user = await requireUser(request);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  const terms = await prisma.glossaryTerm.findMany({ where: { userId: user.id }, orderBy: { createdAt: "asc" } });
  return NextResponse.json({ terms });
}

export async function POST(request: NextRequest) {
  const user = await requireUser(request);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const ru = typeof body?.ru === "string" ? body.ru.trim() : "";
  const en = typeof body?.en === "string" ? body.en.trim() : "";
  if (!ru || !en) return NextResponse.json({ error: "Заполните оба поля" }, { status: 400 });

  const term = await prisma.glossaryTerm.create({ data: { userId: user.id, ru, en } });
  return NextResponse.json({ term });
}
