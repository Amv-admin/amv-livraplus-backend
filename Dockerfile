# Amv LivraPlus Backend - Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
ENV PORT=4000
EXPOSE 4000
CMD ["node", "src/server.js"]
