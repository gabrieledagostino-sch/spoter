FROM node:current-slim
WORKDIR /home/node/spoter
COPY package*.json .
RUN npm install
EXPOSE 5173