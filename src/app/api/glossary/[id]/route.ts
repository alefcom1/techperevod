import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const term = await prisma.glossaryTerm.findUnique({ where: { id: params.id } });
  if (!term || term.userId !== user.id) {
    return NextResponse.json({ error: "Термин не найден" }, { status: 404 });
  }
  await prisma.glossaryTerm.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
