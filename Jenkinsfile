pipeline {
  agent {
    docker {
      image 'cypress/base:10'
    }

  }
  stages {
    stage('build and test') {
      steps {
        sh 'npm install'
        sh 'npx cypress run'
      }
    }
  }
}
