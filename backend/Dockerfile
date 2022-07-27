FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 5000

RUN npm run seed

CMD [ "node", "server.js" ]