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
        stage('Test') {
            steps {
                sh "npm install"
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
                reportName: 'HTML Report',
                reportTitles: 'E2E Tests Report'
            ])

            deleteDir()
        }
    }
}
