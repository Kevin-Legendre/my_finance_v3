FROM node:16 as client-web

RUN mkdir app

WORKDIR /app

COPY ./client-web .
COPY .env .


RUN yarn config set legacy-peer-deps true

RUN yarn 

CMD yarn dev

FROM node:16-slim as api

RUN mkdir app

WORKDIR /app

COPY api/package.json .
COPY api/config.json .
COPY .env .

RUN yarn

COPY api .

CMD yarn start