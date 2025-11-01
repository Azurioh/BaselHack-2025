FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY packages ./packages

COPY apps/discord-bot/package.json ./apps/discord-bot/
RUN npm install

COPY apps/discord-bot ./apps/discord-bot

WORKDIR /app/apps/discord-bot

RUN npm run build

CMD ["npm", "start"]
