import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const site = await prisma.widgetSite.findUnique({ where: { id: params.id } });
  if (!site || site.userId !== user.id) return NextResponse.json({ error: "Сайт не найден" }, { status: 404 });

  await prisma.widgetSite.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
