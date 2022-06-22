pipeline {
    agent any

    tools {nodejs "node"}
    stages {
        stage('Dependencies') {
            steps {
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
// pipeline {
//   agent {
//     // this image provides everything needed to run Cypress
//     docker {
//       image 'cypress/base:10'
//     }
//   }

//   stages {
//     stage('build and test') {
//       steps {
//         sh 'npm ci'
//         sh 'npm run cy:run'
//       }
//     }
//   }
// }