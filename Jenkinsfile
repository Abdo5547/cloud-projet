pipeline {
    agent any

    stages {
        // Étape 1 : Récupérer le code depuis GitHub
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Abdo5547/cloud-projet.git'
            }
        }

        // Étape 2 : Build du backend Spring Boot
        stage('Build Backend') {
            steps {
                sh './mvnw clean package'  // Supposant que vous utilisez Maven
            }
        }

        // Étape 3 : Installer les dépendances et Build du frontend React
        stage('Build Frontend') {
            steps {
                dir('frontend') {  // Se déplacer dans le dossier frontend
                    sh 'npm install'     // Reconstruit node_modules
                    sh 'npm run build'   // Génère les fichiers de production (dossier build/)
                }
            }
        }

        // Étape 4 : Construire les images Docker
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t abdo8558/resismart:backend -f backend/Dockerfile .'
                sh 'docker build -t abdo8558/resismart:frontend -f frontend/Dockerfile .'
            }
        }

        // Étape 5 : Déployer sur Kubernetes
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f backend/mysql.yaml'
                sh 'kubectl apply -f backend/secret.yaml'
                sh 'kubectl apply -f backend/configmap.yaml'
                sh 'kubectl apply -f backend/backend.yaml'
                sh 'kubectl apply -f frontend/frontend.yaml'
            }
        }
    }

    // Actions post-build (optionnel)
    post {
        success {
            echo '✅ Déploiement réussi!'
        }
        failure {
            echo '❌ Déploiement échoué!'
        }
    }
}
