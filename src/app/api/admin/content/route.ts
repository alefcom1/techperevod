import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_CONTENT, getContent, saveContent, type SiteContent } from "@/lib/site-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET/PUT защищены src/middleware.ts (требует валидную admin-сессию) —
 * здесь дополнительной проверки пароля не требуется.
 */

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(override)) return base;
  if (!isPlainObject(base)) return base;
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = override[key];
    result[key] = isPlainObject(baseValue) ? deepMerge(baseValue, overrideValue) : overrideValue;
  }
  return result as T;
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!isPlainObject(body)) {
    return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
  }
  const merged = deepMerge(DEFAULT_CONTENT, body) as SiteContent;
  await saveContent(merged);
  return NextResponse.json({ ok: true, content: merged });
}
