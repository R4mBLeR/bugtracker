FROM node:24-alpine

WORKDIR /app

RUN mkdir -p /app/data && chown -R node:node /app/data

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

USER node

COPY --chown=node:node . .
COPY --chown=node:node .env.prod .env

ENV NODE_ENV=production

RUN npm run build --verbose

EXPOSE 8080

CMD ["node", "dist/src/main.js"]
