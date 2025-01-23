# Étape 1 : Construction de l'application React
FROM node:20-alpine AS build

WORKDIR /app

# Installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier les fichiers de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Servir l'application
FROM nginx:alpine

# Copier les fichiers build dans le dossier par défaut de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]