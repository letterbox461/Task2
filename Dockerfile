FROM node:16.14.2-alpine

WORKDIR /app

COPY package*.json ./
COPY ./api/package*.json ./api/
COPY ./storage/package*.json ./storage/
COPY ./messageBroker/package*.json ./messageBroker/
COPY ./install.js ./

RUN npm i
RUN cd ./api && npm i
RUN cd ./messageBroker && npm i
RUN cd ./storage && npm i

COPY . .

CMD ["npm","run","start"]