FROM node:18

# Install watchman for improved file watching (optional but recommended)
RUN apt-get update && apt-get install -y watchman && apt-get clean

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

# Necessary for reliable file watching in Docker
ENV CHOKIDAR_USEPOLLING=1

EXPOSE 19000 19001 19002

CMD ["npx", "expo", "start", "--lan"]
