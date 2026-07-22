// Обёртка для запуска воркера как обычного Node.js-процесса вне Vercel
// (например, на своём VPS, если IP-диапазон Vercel заблокирован для части
// клиентов). Сам api/index.js ничего не знает про Vercel — он написан под
// стандартную Node.js сигнатуру (req, res), поэтому просто прокидывается
// в http.createServer напрямую.
//
// Запуск: node --env-file=.env.local server.js (Node 20.6+; переменные —
// как в README.md: PROXY_SECRET, ANTHROPIC_API_KEY и т.д.). В проде — через
// pm2 за nginx с TLS (см. README.md, раздел "Деплой на свой VPS").
import http from "node:http";
import handler from "./api/index.js";

const port = Number(process.env.PORT) || 8787;

http
  .createServer((req, res) => {
    handler(req, res).catch((e) => {
      console.error("[techperevod-worker]", e);
      if (!res.headersSent) res.writeHead(500, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Internal error" }));
    });
  })
  .listen(port, () => {
    console.log(`techperevod-worker listening on :${port}`);
  });
