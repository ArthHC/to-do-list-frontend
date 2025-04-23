# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: produção
FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3001

CMD ["npm", "start"]
