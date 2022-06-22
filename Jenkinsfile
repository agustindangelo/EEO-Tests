pipeline {
    agent any

    tools {nodejs "node"}

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/agustindangelo/EEO-Tests.git']]])
                }
            }
        }
        stage('Dependencies') {
            steps {
                sh(script: 'npm install -g npm@latest')
                sh(script:'npm install') 
            }
        }
        stage('e2e Tests') {
            steps {
                sh(script:'npm run cy:run') 
            }
        }
    }
}