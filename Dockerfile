FROM node:current-slim
WORKDIR /webServer
COPY package*.json /webServer/
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]
#docker run -it -p 5173:5173 -v .:/webServer sveltekit-ws