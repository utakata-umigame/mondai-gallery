FROM node:9-alpine

WORKDIR /app/client

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install && \
    npm run build

EXPOSE 8080 8000