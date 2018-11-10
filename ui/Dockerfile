# base image
FROM node:9.6.1

# set working directory
RUN mkdir -p /usr/src/
WORKDIR /usr/src/

COPY package.json /usr/src/

RUN npm install --silent

COPY . /usr/src

EXPOSE 3000

CMD npm start
