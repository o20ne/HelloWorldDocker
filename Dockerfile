FROM node:5

ENV NODE_ENV=docker

WORKDIR /usr/src/app

#COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN rm -rf node_modules
RUN rm -rf Archive.zip
RUN ls -al

RUN npm --version
RUN node --version
RUN npm set progress=false
RUN npm install
# The following install will hit error
# RUN npm install -g --verbose fsevents

EXPOSE 3000 8000 8080

CMD npm start
