FROM node:16.14.2-alpine

WORKDIR /app

COPY package*.json ./
COPY ./api/package*.json ./api/
COPY ./storage/package*.json ./storage/
COPY ./messageBroker/package*.json ./messageBroker/
COPY ./install.js ./

RUN npm run install_all

COPY . .

CMD ["npm","run","start"]