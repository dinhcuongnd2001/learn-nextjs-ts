FROM node:20-alpine3.20

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENTRYPOINT npm start

