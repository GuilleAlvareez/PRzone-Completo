# Usar la imagen oficial y ligera de Nginx
FROM nginx:alpine

# Eliminar la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestro archivo de configuración personalizado al lugar correcto dentro del contenedor
COPY nginx.conf /etc/nginx/conf.d/