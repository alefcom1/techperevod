import { NextRequest, NextResponse } from "next/server";
import { gradeTranslatorTest, type AnsweredQuestion } from "@/lib/translatorTest";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const lang = String(body?.lang ?? "").trim();
  const qa: AnsweredQuestion[] = Array.isArray(body?.qa) ? body.qa : [];
  if (!lang || !qa.length) return NextResponse.json({ error: "Некорректные данные теста" }, { status: 400 });

  try {
    const result = await gradeTranslatorTest(lang, qa);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Не удалось проверить тест" }, { status: 502 });
  }
}
