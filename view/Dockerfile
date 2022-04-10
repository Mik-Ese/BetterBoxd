FROM node:alpine

WORKDIR /app

COPY ./package*.json .

ENV REACT_APP_URL INSERT_IP_ADDRESS_HERE

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]