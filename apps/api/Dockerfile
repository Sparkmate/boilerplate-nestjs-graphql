FROM node:lts-alpine AS base
RUN apk update
WORKDIR /app
COPY ./out/full/apps/api .
RUN yarn install

FROM base AS runner
WORKDIR /app

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE $PORT

CMD yarn run start
