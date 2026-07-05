// techperevod — прозрачный стриминговый прокси к Anthropic API (/v1/*).
// Модель не фиксирована: приходит в теле запроса (model) — Haiku/Sonnet/Opus.
// CORS открыт для сайта бюро (env ALLOWED_ORIGINS), preflight обрабатывается.
//
// Деплой: cd deploy/techperevod-worker && npx vercel --prod
// (это отдельный проект Vercel `techperevod`, НЕ часть Next.js-сайта; сам сайт
// ходит сюда сервер-сервер через ANTHROPIC_BASE_URL/ANTHROPIC_AUTH_TOKEN,
// см. src/lib/translate.ts)
export const config = { runtime: "edge", regions: ["cdg1"] };

const DEFAULT_ORIGINS = "https://techperevod.com,https://www.techperevod.com";

function corsHeaders(request) {
  const origins = (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS).split(",").map((s) => s.trim());
  const origin = request.headers.get("origin") || "";
  if (!origins.includes(origin)) return {};
  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "authorization, content-type, anthropic-version, anthropic-beta, x-api-key",
    "access-control-max-age": "86400",
  };
}

export default async function handler(request) {
  const cors = corsHeaders(request);

  // Preflight из браузера
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  const url = new URL(request.url);

  // Авторизация: Bearer-заголовок (Next.js/SDK) или ?secret= (скрипты)
  const bearer = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const qsSecret = url.searchParams.get("secret");
  const secret = process.env.PROXY_SECRET;
  if (!secret || (bearer !== secret && qsSecret !== secret)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403, headers: { ...cors, "content-type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }), {
      status: 500, headers: { ...cors, "content-type": "application/json" },
    });
  }

  // (необязательно) белый список моделей: env ALLOWED_MODELS="haiku,sonnet,opus"
  const allowed = (process.env.ALLOWED_MODELS || "").trim();
  if (allowed && request.method === "POST") {
    try {
      const clone = await request.clone().json();
      if (clone.model && !allowed.split(",").some((m) => clone.model.includes(m.trim()))) {
        return new Response(JSON.stringify({ error: `Model not allowed: ${clone.model}` }), {
          status: 403, headers: { ...cors, "content-type": "application/json" },
        });
      }
    } catch { /* не JSON — пропускаем, разберётся Anthropic */ }
  }

  url.searchParams.delete("secret");
  const target = "https://api.anthropic.com" + url.pathname.replace(/^\/api/, "") +
    (url.searchParams.toString() ? "?" + url.searchParams.toString() : "");

  const headers = new Headers(request.headers);
  headers.delete("authorization");
  headers.delete("host");
  headers.delete("origin");
  headers.set("x-api-key", apiKey);
  if (!headers.has("anthropic-version")) headers.set("anthropic-version", "2023-06-01");

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    });
    const respHeaders = new Headers(upstream.headers);
    for (const [k, v] of Object.entries(cors)) respHeaders.set(k, v);
    // Стрим отдаём как есть — ответ идёт по мере генерации
    return new Response(upstream.body, { status: upstream.status, headers: respHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Proxy error", details: String(e?.message || e) }), {
      status: 502, headers: { ...cors, "content-type": "application/json" },
    });
  }
}
