#!/usr/bin/env bash
# Идемпотентно поддерживает site-блок proxy.techperevod.com в Caddyfile стека
# sitelens/remarka и перезагружает Caddy, если блока не было.
#
# Зачем: их Caddyfile ведётся вручную (не в git, без генератора-шаблона) и может
# быть переписан целиком их деплоем или параллельной сессией, стирая наш блок.
# Этот скрипт — «самолечение»: если блок на месте, он ничего не делает; если
# пропал — дописывает и перезагружает Caddy на лету (без простоя других сайтов).
#
# Использование:
#   bash ensure-caddy-route.sh
# Можно (рекомендуется) добавить вызов в конец деплой-скрипта remarka — тогда
# блок восстанавливается автоматически после каждого их деплоя.
#
# Переопределяемые переменные окружения:
#   CADDYFILE        путь к Caddyfile     (по умолчанию ~/remarka-lab/sitelens/Caddyfile)
#   CADDY_CONTAINER  имя контейнера Caddy (по умолчанию sitelens-caddy-1)
set -euo pipefail

CADDYFILE="${CADDYFILE:-$HOME/remarka-lab/sitelens/Caddyfile}"
CADDY_CONTAINER="${CADDY_CONTAINER:-sitelens-caddy-1}"
DOMAIN="proxy.techperevod.com"

if [ ! -f "$CADDYFILE" ]; then
  echo "ОШИБКА: не найден Caddyfile: $CADDYFILE" >&2
  echo "Укажите путь: CADDYFILE=/path/to/Caddyfile bash $0" >&2
  exit 1
fi

if grep -q "$DOMAIN" "$CADDYFILE"; then
  echo "Блок $DOMAIN уже есть в $CADDYFILE — ничего не делаю."
  exit 0
fi

echo "Блок $DOMAIN отсутствует — добавляю..."
cat >> "$CADDYFILE" <<'BLOCK'

# ─── techperevod worker (внешний проект) — НЕ УДАЛЯТЬ ────────────────────────
# Проксирует proxy.techperevod.com на контейнер techperevod-worker в этой же
# Docker-сети (сайт techperevod.com ходит к Anthropic/OpenAI/DeepL через него).
# Восстанавливается: deploy/techperevod-worker/ensure-caddy-route.sh
proxy.techperevod.com {
	encode zstd gzip
	reverse_proxy techperevod-worker:8787
	log {
		output stdout
		format console
	}
}
BLOCK

echo "Перезагружаю Caddy..."
docker exec "$CADDY_CONTAINER" caddy reload --config /etc/caddy/Caddyfile
echo "Готово: $DOMAIN восстановлен и Caddy перезагружен."
