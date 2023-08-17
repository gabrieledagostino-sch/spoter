FROM node:latest
WORKDIR /home/node/spoter
COPY package*.json .
RUN npm ci
COPY prisma .
COPY .env ./
RUN npx prisma generate
EXPOSE 5173