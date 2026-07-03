import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest, { params }: { params: { id: string; translationId: string } }) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const site = await prisma.widgetSite.findUnique({ where: { id: params.id } });
  if (!site || site.userId !== user.id) return NextResponse.json({ error: "Сайт не найден" }, { status: 404 });

  const record = await prisma.widgetTranslation.findUnique({ where: { id: params.translationId } });
  if (!record || record.siteId !== params.id) {
    return NextResponse.json({ error: "Перевод не найден" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const translation = typeof body?.translation === "string" ? body.translation.trim() : "";
  if (!translation) return NextResponse.json({ error: "Пустой перевод" }, { status: 400 });

  const updated = await prisma.widgetTranslation.update({
    where: { id: params.translationId },
    data: { translation, editedByUser: true },
  });
  return NextResponse.json({ translation: updated });
}
