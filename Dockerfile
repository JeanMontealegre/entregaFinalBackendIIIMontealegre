# Imagen base de Node.js
FROM node:20

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto que usa tu app
EXPOSE 8080

# Comando para correr la aplicación
CMD ["npm", "start"]
