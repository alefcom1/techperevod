# Воркер-прокси как отдельный контейнер (вариант для сервера, где 80/443 уже
# заняты чужим reverse-proxy — например Caddy стека sitelens/remarka). Контейнер
# подключается к внешней Docker-сети этого стека (см. docker-compose.yml рядом),
# и Caddy проксирует на него по имени сервиса `techperevod-worker:8787`.
#
# Порт наружу НЕ публикуется — воркер доступен только внутри Docker-сети,
# снаружи к нему ходит только Caddy. Секреты — через env_file (.env.local).
FROM node:20-alpine
WORKDIR /app

# Сначала манифест — слой с npm install кешируется, пока не менялись зависимости.
COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./
COPY api ./api

EXPOSE 8787
CMD ["node", "server.js"]
