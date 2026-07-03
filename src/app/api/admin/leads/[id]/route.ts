import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const STATUSES = new Set(["new", "contacted", "won", "lost"]);

/** Защищено src/middleware.ts (требует валидную admin-сессию). */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json().catch(() => null);
  const status = typeof body?.status === "string" ? body.status : "";
  if (!STATUSES.has(status)) return NextResponse.json({ error: "Неизвестный статус" }, { status: 400 });

  const lead = await prisma.lead.update({ where: { id: params.id }, data: { status } }).catch(() => null);
  if (!lead) return NextResponse.json({ error: "Заявка не найдена" }, { status: 404 });
  return NextResponse.json({ lead });
}
