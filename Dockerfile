FROM node:9-alpine

WORKDIR /app
COPY . /app

CMD ["npm", "start"]
EXPOSE 3000
