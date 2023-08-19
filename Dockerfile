FROM node:latest
WORKDIR /home/node/spoter
COPY package*.json .
COPY prisma ./prisma/
COPY .env ./
COPY ./*.pem ./
RUN npm ci
RUN npx prisma generate
EXPOSE 5173