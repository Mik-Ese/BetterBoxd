FROM node:alpine

# model
WORKDIR /app/model

COPY ./model/package.json .
RUN npm install
COPY ./model .

# controller
WORKDIR /app/controller

COPY ./controller/package.json .
RUN npm install
COPY ./controller .


WORKDIR /app
COPY ./package.json .
RUN npm install

CMD ["npm", "start"]
