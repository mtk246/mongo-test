FROM node:16.18.1-alpine3.15

WORKDIR /usr/src/app

COPY . .

RUN npm install --save

Expose 8000

CMD ["node","index.js"]
