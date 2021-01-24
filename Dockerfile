FROM node:15.6.0-alpine3.12

COPY ./node /app/node

WORKDIR /app/node

RUN npm i

ENTRYPOINT [ "node", "main.js" ]