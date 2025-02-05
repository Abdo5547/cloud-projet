# Étape 1 : Utiliser une image Java 18
FROM openjdk:18-jdk-alpine

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier le fichier pom.xml et télécharger les dépendances (optimisation du cache)
COPY pom.xml ./
RUN apk add --no-cache maven && mvn dependency:go-offline

# Étape 4 : Copier le code source
COPY src ./src

# Étape 5 : Compiler le projet et créer le fichier JAR
RUN mvn clean package -DskipTests

# Étape 6 : Exposer le port utilisé par Spring Boot
EXPOSE 8080

# Étape 7 : Exécuter l'application
CMD ["java", "-jar", "target/Resismart-0.0.1-SNAPSHOT.jar"]
