import crypto from "node:crypto";

/**
 * Общие хелперы для локализации сайтов "на лету" (п.4 плана) — JS-виджет,
 * который клиент вставляет на свой сайт (см. public/widget.js).
 */

export function generateSiteKey(): string {
  return "tpw_" + crypto.randomBytes(16).toString("hex");
}

/** Стабильный короткий хэш текста — ключ кэша перевода (не для безопасности). */
export function hashText(text: string): string {
  return crypto.createHash("sha256").update(text.trim()).digest("hex").slice(0, 24);
}

export function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
