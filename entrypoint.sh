#!/bin/bash

npx prisma generate
npx prisma migrate dev --name init
node ./prisma/index.js
npm run preview
