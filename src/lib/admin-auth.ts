/**
 * Один общий пароль для /admin, без учёток пользователей. Сессия — httpOnly
 * cookie, хранящая SHA-256(пароль). Проверка идёт через Web Crypto
 * (crypto.subtle), доступный и в Node, и в Edge-рантайме middleware.
 */
export const ADMIN_SESSION_COOKIE = "tp_admin_session";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getAdminPassword(): string | undefined {
  return process.env.ADMIN_PASSWORD;
}

export async function createSessionToken(): Promise<string | null> {
  const password = getAdminPassword();
  if (!password) return null;
  return sha256Hex(password);
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  const password = getAdminPassword();
  if (!password) return false;
  return candidate === password;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const expected = await createSessionToken();
  if (!expected) return false;
  return token === expected;
}
