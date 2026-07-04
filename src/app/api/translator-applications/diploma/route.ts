import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const MAX_BYTES = 10 * 1024 * 1024;
const UPLOAD_DIR = path.join(process.cwd(), "data", "uploads");

function safeExt(name: string): string {
  const ext = path.extname(name).toLowerCase();
  return /^\.[a-z0-9]{1,10}$/.test(ext) ? ext : "";
}

/** Загрузка диплома/сертификата к анкете переводчика — файл сохраняется вне
 * git (data/uploads, см. .gitignore) и отдаётся обратно через
 * /api/uploads/[filename], чтобы передать в ТМС ссылку, а не сам файл. */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });

  const file = form.get("diploma");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Файл > 10 МБ" }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${randomUUID()}${safeExt(file.name)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const origin = request.nextUrl.origin;
  return NextResponse.json({ url: `${origin}/api/uploads/${filename}` });
}
