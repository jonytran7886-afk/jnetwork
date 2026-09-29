ARG NODE_VERSION=22-alpine

FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# The source currently has no usable dependency lockfile.
COPY package.json ./
RUN npm install --include=dev --no-audit --no-fund

COPY next.config.ts tsconfig.json postcss.config.mjs next-env.d.ts ./
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NODE_OPTIONS="--disable-proto=delete --max-old-space-size=512"

RUN apk add --no-cache tini

# `output: 'standalone'` in next.config.ts traces the exact production
# dependency graph into .next/standalone, so the runner image only needs
# that folder plus the static assets — no full node_modules, no source.
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
ENTRYPOINT ["tini", "--"]
CMD ["node", "server.js"]
