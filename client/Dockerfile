FROM node:8.11.3-alpine

WORKDIR /app/client

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g @vue/cli

CMD ["/bin/sh"]