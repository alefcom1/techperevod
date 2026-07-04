import { NextRequest, NextResponse } from "next/server";
import { generateTranslatorTest } from "@/lib/translatorTest";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = String(body?.lang ?? "").trim();
  if (!lang) return NextResponse.json({ error: "Не указан язык" }, { status: 400 });

  try {
    const test = await generateTranslatorTest(lang);
    return NextResponse.json(test);
  } catch {
    return NextResponse.json({ error: "Не удалось сгенерировать тест" }, { status: 502 });
  }
}
