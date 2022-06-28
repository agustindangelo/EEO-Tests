pipeline {

    agent any

    /* triggers{ cron('H/5 * * * *') } */

    environment {
        USER_EMAIL='agustin.dangelo@endava.com'
        USER_NAME='Agustin Dangelo'
        USER_PASSWORD=credentials('USER_PASSWORD')
        LOCAL_API_URL="http://localhost:4000"
    }

    options {
        ansiColor('xterm')
    }

    parameters {
        choice(
            name: 'TAG',
            choices: ['EntireSuite', 'Login', 'HappyPath'],
            description: 'Specify which tests to run by providing a tag to the test runner'
        )
    }
    
    stages {
        stage('Install dependencies') {
            steps {
                sh "npm install"
            }
        }

        stage('Run tests with a tag') {
            when {
                expression {
                    return params.TAG != 'EntireSuite'
                }
            }
            steps {
                sh '''
                    CYPRESS_INCLUDE_TAGS=${TAG}
                    CYPRESS_USER_EMAIL=${USER_EMAIL}
                    CYPRESS_USER_PASSWORD=${USER_PASSWORD}
                    CYPRESS_LOCAL_API_URL=${LOCAL_API_URL}
                    npm run cy:run
                ''''
            }
        }

        stage('Run the entire test suite') {
            when {
                expression {
                    return params.TAG == 'EntireSuite'
                }
            }
            steps {
                sh '''
                    CYPRESS_USER_EMAIL=${USER_EMAIL}
                    CYPRESS_USER_PASSWORD=${USER_PASSWORD}
                    CYPRESS_LOCAL_API_URL=${LOCAL_API_URL}
                    npm run cy:run
                ''''
            }
        }
    }

    post {
        always{
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: 'mochawesome-report',
                reportFiles: 'mochawesome.html',
                reportName: 'HTML Report'
            ])

            deleteDir()
        }
    }
}
