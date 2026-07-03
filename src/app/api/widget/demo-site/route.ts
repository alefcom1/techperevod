import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateSiteKey } from "@/lib/widget";

export const runtime = "nodejs";

const DEMO_DOMAIN = "widget-demo.techperevod.local";

/**
 * Служебный "сайт" для публичной демо-страницы (public/widget-demo.html) —
 * доказательство того, что виджет реально работает, без привязки к аккаунту.
 * Get-or-create: первый вызов создаёт запись, дальше просто отдаёт её.
 */
export async function GET() {
  let site = await prisma.widgetSite.findFirst({ where: { domain: DEMO_DOMAIN, userId: null } });
  if (!site) {
    site = await prisma.widgetSite.create({
      data: {
        userId: null,
        domain: DEMO_DOMAIN,
        siteKey: generateSiteKey(),
        sourceLang: "ru",
        targetLangs: JSON.stringify(["en", "de"]),
      },
    });
  }
  return NextResponse.json({ siteKey: site.siteKey, sourceLang: site.sourceLang, targetLangs: JSON.parse(site.targetLangs) });
}
