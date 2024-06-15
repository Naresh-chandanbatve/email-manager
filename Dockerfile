# Building stage
FROM node:18-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .


# Runnig stage
FROM node:18-bookworm-slim

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "run", "dev"]