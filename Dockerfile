FROM node:16.13.1-alpine3.15

WORKDIR /usr/src/app

RUN npm i -g @nestjs/cli

COPY package.json ./

RUN npm install

COPY . .

RUN nest build

CMD ["npm", "run", "start"]
