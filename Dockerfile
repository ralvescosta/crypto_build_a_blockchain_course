FROM node:16.13.2-alpine AS build

USER node

WORKDIR /build
COPY package.json package-lock.json yarn.lock ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.13.2-alpine

WORKDIR /app
COPY package.json package-lock.json .env.* /
RUN npm install --only=prod
COPY --from=build /build/dist ./

CMD ["node", "main.js"]