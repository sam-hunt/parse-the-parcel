FROM node:latest

RUN mkdir /usr/share/parsetheparcel
COPY . /usr/share/parsetheparcel

WORKDIR /usr/share/parsetheparcel
RUN npm install
RUN npm install -g npx ts-node typescript

CMD [ "npm", "run", "start:prod" ]
