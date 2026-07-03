import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE, getSessionUser } from "@/lib/auth";
import { isKnownLang } from "@/lib/translate";
import { generateSiteKey } from "@/lib/widget";

export const runtime = "nodejs";

async function requireUser(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  return getSessionUser(token);
}

export async function GET(request: NextRequest) {
  const user = await requireUser(request);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const sites = await prisma.widgetSite.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { translations: true } } },
  });
  return NextResponse.json({ sites });
}

export async function POST(request: NextRequest) {
  const user = await requireUser(request);
  if (!user) return NextResponse.json({ error: "Не авторизован" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const domain = typeof body?.domain === "string" ? body.domain.trim().toLowerCase() : "";
  const sourceLang = typeof body?.sourceLang === "string" ? body.sourceLang : "ru";
  const targetLangs = Array.isArray(body?.targetLangs)
    ? body.targetLangs.filter((l: unknown): l is string => typeof l === "string" && isKnownLang(l) && l !== sourceLang)
    : [];

  if (!domain) return NextResponse.json({ error: "Укажите домен" }, { status: 400 });
  if (!isKnownLang(sourceLang)) return NextResponse.json({ error: "Неизвестный язык оригинала" }, { status: 400 });
  if (targetLangs.length === 0) return NextResponse.json({ error: "Выберите хотя бы один целевой язык" }, { status: 400 });

  const site = await prisma.widgetSite.create({
    data: { userId: user.id, domain, sourceLang, targetLangs: JSON.stringify(targetLangs), siteKey: generateSiteKey() },
  });
  return NextResponse.json({ site });
}
