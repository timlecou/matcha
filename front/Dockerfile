FROM node:15-alpine

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000