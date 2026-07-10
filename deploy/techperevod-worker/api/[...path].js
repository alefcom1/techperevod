// techperevod — единый прокси-воркер к нескольким провайдерам ИИ-перевода.
// Маршрутизация по первому сегменту пути после /api:
//   /api/v1/*      → api.anthropic.com   (Claude, ключ ANTHROPIC_API_KEY)
//   /api/openai/*  → api.openai.com      (GPT,    ключ OPENAI_API_KEY)
//   /api/deepl/*   → api[-free].deepl.com(DeepL,  ключ DEEPL_API_KEY)
//
// Сайт бюро аутентифицируется одним PROXY_SECRET (Bearer или ?secret=),
// реальные ключи провайдеров живут ТОЛЬКО в env Vercel. CORS открыт для
// сайта (env ALLOWED_ORIGINS), preflight обрабатывается.
//
// Деплой: cd deploy/techperevod-worker && npx vercel --prod (отдельный
// проект Vercel `techperevod`, НЕ часть Next.js-сайта).
//
// Edge Functions разворачиваются на всех edge-узлах Vercel глобально и не
// поддерживают привязку к региону (regions — только для serverless/Node
// функций). Ранее regions: ["cdg1"] здесь и в vercel.json приводил к
// платформенному NOT_FOUND на любом edge-узле, отличном от cdg1, т.к.
// анкаст-маршрутизация продолжает направлять запросы на ближайший к
// клиенту узел, где функции физически нет.
export const config = { runtime: "edge" };

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

/**
 * По пути после /api выбирает провайдера: реальный host, путь у провайдера,
 * заголовок авторизации с реальным ключом. Возвращает null, если ключ
 * провайдера не сконфигурирован — воркер честно отвечает 500.
 */
function resolveProvider(pathname) {
  const rest = pathname.replace(/^\/api/, ""); // /v1/messages | /openai/... | /deepl/...

  if (rest.startsWith("/openai/") || rest === "/openai") {
    const key = process.env.OPENAI_API_KEY;
    if (!key) return { error: "OPENAI_API_KEY not configured" };
    return {
      host: "api.openai.com",
      path: rest.replace(/^\/openai/, ""),
      authHeader: ["authorization", `Bearer ${key}`],
    };
  }

  if (rest.startsWith("/deepl/") || rest === "/deepl") {
    const key = process.env.DEEPL_API_KEY;
    if (!key) return { error: "DEEPL_API_KEY not configured" };
    // Ключи бесплатного плана DeepL оканчиваются на ":fx" и ходят на другой хост.
    const host = key.endsWith(":fx") ? "api-free.deepl.com" : "api.deepl.com";
    return {
      host,
      path: rest.replace(/^\/deepl/, ""),
      authHeader: ["authorization", `DeepL-Auth-Key ${key}`],
    };
  }

  if (rest.startsWith("/yandex/") || rest === "/yandex") {
    const key = process.env.YANDEX_API_KEY;
    if (!key) return { error: "YANDEX_API_KEY not configured" };
    // Yandex Translate (Yandex Cloud). folderId сайт передаёт в теле запроса
    // (не секрет), ключ — только здесь как заголовок "Api-Key <key>".
    return {
      host: "translate.api.cloud.yandex.net",
      path: rest.replace(/^\/yandex/, ""),
      authHeader: ["authorization", `Api-Key ${key}`],
    };
  }

  // По умолчанию — Anthropic (/v1/*).
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return { error: "ANTHROPIC_API_KEY not configured" };
  return {
    host: "api.anthropic.com",
    path: rest,
    authHeader: ["x-api-key", key],
    anthropic: true,
  };
}

export default async function handler(request) {
  const cors = corsHeaders(request);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  const url = new URL(request.url);

  // Авторизация сайта перед воркером: единый PROXY_SECRET.
  const bearer = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const qsSecret = url.searchParams.get("secret");
  const secret = process.env.PROXY_SECRET;
  if (!secret || (bearer !== secret && qsSecret !== secret)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { ...cors, "content-type": "application/json" },
    });
  }

  const provider = resolveProvider(url.pathname);
  if (provider.error) {
    return new Response(JSON.stringify({ error: provider.error }), {
      status: 500,
      headers: { ...cors, "content-type": "application/json" },
    });
  }

  url.searchParams.delete("secret");
  const target = `https://${provider.host}${provider.path}` + (url.searchParams.toString() ? "?" + url.searchParams.toString() : "");

  const headers = new Headers(request.headers);
  headers.delete("authorization");
  headers.delete("x-api-key");
  headers.delete("host");
  headers.delete("origin");
  headers.set(provider.authHeader[0], provider.authHeader[1]);
  if (provider.anthropic && !headers.has("anthropic-version")) headers.set("anthropic-version", "2023-06-01");

  try {
    const upstream = await fetch(target, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    });
    const respHeaders = new Headers(upstream.headers);
    for (const [k, v] of Object.entries(cors)) respHeaders.set(k, v);
    return new Response(upstream.body, { status: upstream.status, headers: respHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Proxy error", details: String(e?.message || e) }), {
      status: 502,
      headers: { ...cors, "content-type": "application/json" },
    });
  }
}
