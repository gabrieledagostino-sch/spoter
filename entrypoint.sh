#!/bin/bash

if [ ! -f ".setup_done" ]; then
    echo setting up db
    npx prisma generate
    npx prisma migrate dev --name init
    node ./prisma/index.js
    echo setting up done
    touch .setup_done
fi

npm run preview
