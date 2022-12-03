FROM node:16.18.1-slim as builder
RUN apt-get -qy update && apt-get -qy install openssl
USER node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npx prisma generate
RUN npm run build \
    && npm prune --production
FROM node:16.18.1-slim
RUN apt-get -qy update && apt-get -qy install openssl
USER node
WORKDIR /usr/src/app
COPY --from=builder --chown=node:node /usr/src/app/package*.json ./
COPY --from=builder --chown=node:node /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /usr/src/app/dist/ ./dist/
CMD [ "node", "dist/main.js" ]