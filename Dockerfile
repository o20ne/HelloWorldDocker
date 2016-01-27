FROM node:4

ENV NODE_ENV=docker

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm set progress=false
RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD npm start
