FROM node:24-alpine

WORKDIR /app

RUN mkdir -p /app/data && chown -R node:node /app/data

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

USER node

EXPOSE 8080

ENV DATABASE_PATH=/app/data/database.db

CMD ["node", "dist/main.js"]
