FROM node:24-alpine

WORKDIR /app

RUN mkdir -p /app/data && chown -R node:node /app/data

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

USER node

EXPOSE 8080

CMD ["node", "dist/src/main.js"]
