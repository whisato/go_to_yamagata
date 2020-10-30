FROM node:10.14.2

WORKDIR /usr/src/app


COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["node","app.js"]