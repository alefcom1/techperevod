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
// НЕ используем runtime: "edge" (см. историю коммитов — на этом проекте
// Edge-роутинг catch-all ловил только один сегмент пути после /api).
// На Node.js serverless-рантайме без runtime: "edge" Vercel вызывает
// функцию классической Node.js сигнатурой (req: IncomingMessage,
// res: ServerResponse), а не Web API Request/Response — отсюда и весь
// код ниже работает с req/res напрямую, а не с Headers/fetch Response.
import { Readable } from "node:stream";

const DEFAULT_ORIGINS = "https://techperevod.com,https://www.techperevod.com";

function corsHeaders(req) {
  const origins = (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS).split(",").map((s) => s.trim());
  const origin = req.headers.origin || "";
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

function sendJson(res, cors, status, body) {
  res.writeHead(status, { ...cors, "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  const cors = corsHeaders(req);

  if (req.method === "OPTIONS") {
    res.writeHead(204, cors);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  // Авторизация сайта перед воркером: единый PROXY_SECRET.
  const bearer = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const qsSecret = url.searchParams.get("secret");
  const secret = process.env.PROXY_SECRET;
  if (!secret || (bearer !== secret && qsSecret !== secret)) {
    sendJson(res, cors, 403, { error: "Unauthorized" });
    return;
  }

  const provider = resolveProvider(url.pathname);
  if (provider.error) {
    sendJson(res, cors, 500, { error: provider.error });
    return;
  }

  url.searchParams.delete("secret");
  const target = `https://${provider.host}${provider.path}` + (url.searchParams.toString() ? "?" + url.searchParams.toString() : "");

  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (["authorization", "x-api-key", "host", "origin", "connection", "content-length"].includes(name)) continue;
    if (Array.isArray(value)) headers.set(name, value.join(", "));
    else if (value !== undefined) headers.set(name, value);
  }
  headers.set(provider.authHeader[0], provider.authHeader[1]);
  if (provider.anthropic && !headers.has("anthropic-version")) headers.set("anthropic-version", "2023-06-01");

  try {
    const hasBody = !["GET", "HEAD"].includes(req.method);
    const upstream = await fetch(target, {
      method: req.method,
      headers,
      body: hasBody ? Readable.toWeb(req) : undefined,
      ...(hasBody ? { duplex: "half" } : {}),
    });

    const respHeaders = { ...cors };
    upstream.headers.forEach((v, k) => {
      if (k === "content-encoding" || k === "content-length" || k === "transfer-encoding") return;
      respHeaders[k] = v;
    });
    res.writeHead(upstream.status, respHeaders);

    if (upstream.body) {
      Readable.fromWeb(upstream.body).pipe(res);
    } else {
      res.end();
    }
  } catch (e) {
    sendJson(res, cors, 502, { error: "Proxy error", details: String(e?.message || e) });
  }
}
