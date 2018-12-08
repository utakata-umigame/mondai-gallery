FROM node:9-alpine

WORKDIR /app/client

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install

CMD ["/bin/sh"]
EXPOSE 8080
