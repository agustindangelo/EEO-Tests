def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]

/* def getBuildUser() { */
/*     return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId() */
/* } */


pipeline {

    agent any

    options {
        ansiColor('xterm')
    }
    
    /* environment { */

    /* } */
    
    stages {
        stage('Install dependencies') {
            steps {
                sh "npm install"
                dir("/home/adangelo/code/pass-it-on-demos") {
                    fileOperations([fileCopyOperation(excludes: '', flattenFiles: true, includes: 'cypress.env*', targetLocation: "${WORKSPACE}")])
                }
            }
        }

        stage('Test') {
            steps {
                sh "CYPRESS_INCLUDE_TAGS=HappyPath npm run cy:run"
            }
        }
    }

    post {
        always{
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: false,
                keepAll: false,
                reportDir: 'mochawesome-report',
                reportFiles: 'mochawesome.html',
                reportName: 'HTML Report'
            ])

            deleteDir()
        }
    }
}
