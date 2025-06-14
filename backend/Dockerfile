FROM node:20-alpine

WORKDIR /app

# Copia PRIMERO los archivos de dependencias desde la subcarpeta 'backend'
COPY backend/package*.json ./

RUN npm install

# AHORA copia el resto del código del backend
COPY backend/ .

EXPOSE 3000

CMD [ "node", "index.js" ]