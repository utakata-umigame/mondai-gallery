FROM node:9-alpine

WORKDIR /app

COPY package*.json /app/
COPY client/package*.json /app/client/

RUN npm install --unsafe-perm

COPY . /app
RUN npm run build

CMD ["npm", "start"]
EXPOSE 3000
