# techperevod — прокси-воркер к провайдерам ИИ-перевода

Единый Vercel edge-воркер (глобальная edge-сеть, без привязки к региону —
Edge Functions region pinning не поддерживают), через который сайт
techperevod.com ходит к нескольким провайдерам. Реальные ключи живут
только здесь, в env Vercel; сайт знает один `PROXY_SECRET`.

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

## Деплой

```bash
cd deploy/techperevod-worker
npx vercel --prod
```

Либо через дашборд Vercel: Import проекта, Root Directory =
`deploy/techperevod-worker`.

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
