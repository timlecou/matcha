FROM node:15

WORKDIR /usr/src/app

RUN npm i -g nodemon

COPY package.json .

# To keep the installation of modules in docker cache
RUN npm install

COPY . .

EXPOSE 4000