FROM node:9-alpine

WORKDIR /app
COPY . /app

RUN npm install -g node-dev
RUN npm install --unsafe-perm

EXPOSE 3000
CMD [ "npm", "start" ]
