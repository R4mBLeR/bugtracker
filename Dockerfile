FROM node:24-alpine

RUN mkdir -p /app && chown -R node:node /app

USER node

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm install --verbose

COPY --chown=node:node . .
COPY --chown=node:node .env.prod .env

ENV NODE_ENV=production

RUN npm run build --verbose

EXPOSE 8080

CMD ["node", "dist/src/main.js"]
