FROM node:15

# ENV APP_ROOT /app

# RUN mkdir ${APP_ROOT}
# WORKDIR ${APP_ROOT}
# ADD . ${APP_ROOT}

# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh

# ENTRYPOINT ["entrypoint.sh"]

WORKDIR /usr/src/app

RUN npm i -g nodemon

COPY package.json .

# To keep the installation of modules in docker cache
RUN npm install

COPY . .

EXPOSE 4000