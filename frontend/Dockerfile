# Étape 1 : Utiliser une image Node.js pour la construction
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Construire l'application React
RUN npm run build

# Étape 2 : Utiliser une image Nginx pour servir le frontend
FROM nginx:alpine

# Copier les fichiers de build React vers Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80 pour l'accès au frontend
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
