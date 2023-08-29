FROM node:latest
RUN mkdir /home/node/spoter
WORKDIR /home/node/spoter
COPY . .
RUN chmod +x entrypoint.sh
RUN npm ci
RUN npm run build
EXPOSE 5173
EXPOSE 4173