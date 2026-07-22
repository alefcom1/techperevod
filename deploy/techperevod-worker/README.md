# techperevod — прокси-воркер к провайдерам ИИ-перевода

Единый воркер, через который сайт techperevod.com ходит к нескольким
провайдерам. Реальные ключи живут только здесь; сайт знает один
`PROXY_SECRET`. Основной handler (`api/index.js`) написан под обычную
Node.js сигнатуру `(req, res)` и одинаково запускается двумя способами:

- **на Vercel** — как serverless-функция (см. «Деплой на Vercel» ниже);
- **на своём VPS** — как обычный Node-процесс через `server.js` (см.
  «Деплой на свой VPS»). Актуально, если IP-диапазон `*.vercel.app`
  заблокирован для части клиентов сайта (так и произошло — VPS сайта в
  России не мог достучаться до `techperevod.vercel.app` на уровне TCP,
  хотя сам воркер на Anthropic ходил без проблем).

## Маршрутизация по пути

| Путь на воркере | Провайдер | Ключ (env Vercel) |
|---|---|---|
| `/api/v1/*` | Anthropic (Claude) | `ANTHROPIC_API_KEY` |
| `/api/openai/*` | OpenAI (GPT) | `OPENAI_API_KEY` |
| `/api/deepl/*` | DeepL | `DEEPL_API_KEY` |
| `/api/yandex/*` | Yandex Translate | `YANDEX_API_KEY` |

DeepL сам определяет хост по ключу: ключи бесплатного плана
оканчиваются на `:fx` → `api-free.deepl.com`, платные → `api.deepl.com`.

Yandex: ключ (`Api-Key`) — в воркере; `folderId` каталога Yandex Cloud
не секрет и передаётся сайтом в теле запроса (env сайта `YANDEX_FOLDER_ID`).

## Переменные окружения (Vercel → Settings → Environment Variables, Production)

| Имя | Значение | Обязательно |
|---|---|---|
| `PROXY_SECRET` | случайная строка (`openssl rand -hex 32`) | да |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | для Claude |
| `OPENAI_API_KEY` | `sk-...` | для GPT |
| `DEEPL_API_KEY` | ключ DeepL (может оканчиваться на `:fx`) | для DeepL |
| `ALLOWED_ORIGINS` | `https://techperevod.com,https://www.techperevod.com` | нет (дефолт) |

После добавления/изменения переменных — Deployments → ⋯ → **Redeploy**.

## Деплой на Vercel

```bash
cd deploy/techperevod-worker
npx vercel --prod
```

Либо через дашборд Vercel: Import проекта, Root Directory =
`deploy/techperevod-worker`.

## Деплой на свой VPS

Нужен отдельный сервер (не тот, где сайт) — свежий Ubuntu с Node.js 20+,
nginx, certbot, и поддомен (например `proxy.techperevod.com`), A-запись
которого указывает на IP этого VPS.

```bash
# 1. Node.js 20 (если ещё не стоит)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs nginx

# 2. Код воркера
git clone https://github.com/alefcom1/techperevod.git ~/techperevod-worker-src
cd ~/techperevod-worker-src/deploy/techperevod-worker
npm install

# 3. Секреты — ТОЛЬКО в .env.local (в .gitignore, деплой/git pull его не тронет)
cat > .env.local <<'EOF'
PROXY_SECRET=<openssl rand -hex 32>
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...          # если используете GPT
DEEPL_API_KEY=...              # если используете DeepL
YANDEX_API_KEY=...             # если используете Yandex Translate
ALLOWED_ORIGINS=https://techperevod.com,https://www.techperevod.com
PORT=8787
EOF

# 4. Процесс через pm2 (npm i -g pm2, если ещё не стоит)
pm2 start npm --name techperevod-worker -- start
pm2 save
```

Дальше — nginx как reverse proxy с TLS (certbot) с `proxy.techperevod.com`
на `127.0.0.1:8787`, аналогично тому, как уже настроен сам сайт на своём
VPS (см. `docs/deploy.md` в корне репозитория). После настройки DNS и
сертификата — обновить на сайте `ANTHROPIC_BASE_URL=https://proxy.techperevod.com/api`
и `ANTHROPIC_AUTH_TOKEN=<тот же PROXY_SECRET>` в `.env.local` сайта, затем
`pm2 restart techperevod --update-env`.

Обновление после `git push` в `main`: `git pull && npm install && pm2 restart techperevod-worker`
(без build-шага — это не Next.js, просто голый JS).

## Проверка

```bash
BASE="https://techperevod.vercel.app/api"
SECRET="<PROXY_SECRET>"

# Claude
curl -s "$BASE/v1/messages" -H "authorization: Bearer $SECRET" -H "content-type: application/json" \
  -d '{"model":"claude-haiku-4-5-20251001","max_tokens":32,"messages":[{"role":"user","content":"ok"}]}'

# GPT
curl -s "$BASE/openai/v1/chat/completions" -H "authorization: Bearer $SECRET" -H "content-type: application/json" \
  -d '{"model":"gpt-4o","max_tokens":32,"messages":[{"role":"user","content":"ok"}]}'

# DeepL
curl -s "$BASE/deepl/v2/translate" -H "authorization: Bearer $SECRET" -H "content-type: application/json" \
  -d '{"text":["Hello"],"target_lang":"RU"}'
```
