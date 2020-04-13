### STAGE 1: Build ###
FROM node:12.13.0 as build

ARG API_HOST
ENV API_HOST $API_HOST

WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install --silent
COPY . /usr/src/app
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:1.13.12-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN cat /etc/nginx/conf.d/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]