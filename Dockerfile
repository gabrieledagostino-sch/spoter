FROM node:current-slim
WORKDIR /home/node/spoter
COPY package*.json .
RUN npm install
EXPOSE 5173
#docker run -it -p 5173:5173 -v .:/webServer sveltekit-ws