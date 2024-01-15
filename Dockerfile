FROM node:20.10-alpine as base

RUN npm i -g pnpm

FROM base AS depedencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=depedencies /app/node_modules ./node_modules
COPY platform.yml .
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist ./dist/
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]