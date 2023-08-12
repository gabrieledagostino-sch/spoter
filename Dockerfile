FROM node:current-slim
WORKDIR /home/node/spoter
COPY package*.json .
RUN npm ci
EXPOSE 5173