pipeline {
    agent any

    tools {nodejs "node"}

    stages {
        stage('Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('e2e Tests') {
            steps {
                sh 'npm run cy:run'
            }
        }
    }
}