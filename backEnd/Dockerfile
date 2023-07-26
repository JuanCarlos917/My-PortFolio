# Define la imagen base que vamos a utilizar. Esta es una imagen de Node.js oficial de Docker Hub.
FROM node:20.3.1

# Crea un directorio en el que nuestra aplicación vivirá dentro del contenedor de Docker
WORKDIR /app

# Copia el archivo package.json y package-lock.json en el directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación en el directorio de trabajo
COPY . .

# Expone el puerto en el que nuestra aplicación se ejecutará
EXPOSE 3001

# Define el comando que se ejecutará cuando el contenedor de Docker se inicie
CMD [ "node", "app.js" ]




