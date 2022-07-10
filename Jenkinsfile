pipeline {
    agent any

    tools {
        nodejs 'local-16.15.0'    
    }

    options {
        ansiColor('xterm')
    }

    environment {
        USER_EMAIL = 'agustin.dangelo@endava.com'
        CYPRESS_USER_NAME = 'Agustin Dangelo'
        CYPRESS_USER_PASSWORD = credentials('USER_PASSWORD')
        CYPRESS_LOCAL_API_URL = 'http://localhost:4000'
        CYPRESS_DASHBOARD_API_KEY = credentials('CYPRESS_DASHBOARD_API_KEY')
    }

    parameters {
        choice(
            name: 'TAG',
            choices: ['EntireSuite', 'Login', 'HappyPath'],
            description: 'Specify which tests to run by providing a tag to the test runner'
        )
        choice(
            name: "BROWSER",
            choices: ['chrome', 'chromium', 'edge', 'electron', 'firefox'],
            description: 'Select a target browser'
        )
    }
    
    stages {
        stage('run api background node process') {
            steps {
                dir('/home/adangelo/code/eeo/eeoservice') {
                    sh 'npm ci'
                    sh 'node app.js &'
                }
            }
        }
      
        stage('build and run client web app') {
            steps {
                dir('/home/adangelo/code/eeo/eeoweb') {
                  sh 'npm run build'
                  sh 'npx serve -s build &'
                }
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
                  CYPRESS_INCLUDE_TAGS=${TAG} \
                  node cypress/trigger-tests-and-report cypress run \
                  --browser ${BROWSER} \
                  --record \
                  --key ${CYPRESS_DASHBOARD_API_KEY}
                '''
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
                  node cypress/trigger-tests-and-report cypress run \
                  --browser ${BROWSER} \
                  --record \
                  --key ${CYPRESS_DASHBOARD_API_KEY}
                '''
            }
        }
    }

    post {
        always {
            sh 'pkill node'
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
