import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Защищено src/middleware.ts (требует валидную admin-сессию). */
export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ leads });
}
