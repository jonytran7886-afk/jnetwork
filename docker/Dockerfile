ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# The source currently has no usable dependency lockfile.
COPY package.json ./
RUN npm install --include=dev --no-audit --no-fund

COPY index.html vite.config.ts tsconfig.json server.ts ./
COPY src ./src
RUN npm run build \
    && ./node_modules/.bin/esbuild server.ts --platform=node --format=esm --packages=external --outfile=server.js \
    && npm prune --omit=dev --no-audit --no-fund \
    && npm cache clean --force

FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NODE_OPTIONS="--disable-proto=delete --max-old-space-size=512"

RUN apk add --no-cache tini

COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/server.js ./server.js

USER node
EXPOSE 3000
ENTRYPOINT ["tini", "--"]
CMD ["node", "server.js"]
