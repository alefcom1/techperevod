/**
 * Ключи для публичного /api/v1/translate. У платформы пока нет базы данных
 * и биллинга — поэтому вместо полноценной выдачи ключей в кабинете:
 *  - один открытый демо-ключ (DEMO_API_KEY), опубликован в документации,
 *    чтобы разработчик мог вызвать API немедленно, без регистрации;
 *  - продакшн-ключи для реальных клиентов заводятся вручную — добавляются
 *    администратором в переменную окружения API_LIVE_KEYS (через запятую)
 *    после обращения через /kontakty. Это тот же паттерн, что и
 *    ADMIN_PASSWORD/ANTHROPIC_API_KEY — секрет живёт в окружении сервера,
 *    без отдельного хранилища.
 */

export const DEMO_API_KEY = "tp_demo_key";

export type ApiKeyTier = "demo" | "live";

export interface ApiKeyCheck {
  valid: boolean;
  tier: ApiKeyTier | null;
}

function liveKeys(): Set<string> {
  return new Set(
    (process.env.API_LIVE_KEYS || "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
  );
}

export function checkApiKey(key: string | null): ApiKeyCheck {
  if (!key) return { valid: false, tier: null };
  if (key === DEMO_API_KEY) return { valid: true, tier: "demo" };
  if (liveKeys().has(key)) return { valid: true, tier: "live" };
  return { valid: false, tier: null };
}

export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;
  const match = /^Bearer\s+(.+)$/i.exec(authHeader.trim());
  return match ? match[1].trim() : null;
}
