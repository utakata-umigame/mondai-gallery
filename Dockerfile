FROM node:9-alpine

WORKDIR /app

COPY package*.json /app/
COPY client /app/client/

RUN npm install --unsafe-perm

COPY . /app

CMD ["npm", "start"]
EXPOSE 3000
