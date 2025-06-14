# --- Etapa 1: Construcción (Build) ---
FROM node:20-alpine AS build

WORKDIR /app

# Copia PRIMERO los archivos de dependencias desde la subcarpeta 'frontend'
COPY frontend/package*.json ./

RUN npm install

# AHORA copia el resto del código del frontend
COPY frontend/ .

RUN npm run build

# --- Etapa 2: Servir (Serve) ---
FROM nginx:alpine

# Copia los archivos construidos desde la etapa de 'build'
COPY --from=build /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]