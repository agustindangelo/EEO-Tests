pipeline {
    agent any

    tools {
        nodejs 'local-16.15.0'    
    }

    options {
        ansiColor('xterm')
    }

    environment {
        CYPRESS_USER_EMAIL = 'agustin.dangelo@endava.com'
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
        stage('checkout and run API node process') {
            steps {
                dir('eeoservice') {
                    git branch: 'develop', credentialsId: '057f3261-bca7-4ffe-abf1-4065193405ab', url: 'https://github.com/manupalacios/eeoservice'
                    sh 'yarn install'
                    withCredentials([file(credentialsId: 'eeoservice_env_file', variable: 'FILE')]) {
                        sh 'cp \$FILE ./.env'
                    }
                    sh 'node app.js &'
                }
            }
        }
      
        stage('checkout, build and run client web app') {
            steps {
                dir('eeoweb') {
                    git branch: 'develop', credentialsId: '057f3261-bca7-4ffe-abf1-4065193405ab', url: 'https://github.com/manupalacios/eeoweb'
                    sh 'yarn install'
                    withCredentials([file(credentialsId: 'eeoweb_env_file', variable: 'FILE')]) {
                        sh 'cp \$FILE ./.env'
                    }
                    sh 'npm run build'
                    sh 'yarn add serve'
                    sh './node_modules/serve/bin/serve.js -s build &'
                }
            }  
        }

        stage('install dependencies for EEO-Tests project') {
            steps {
                git branch: 'main', url: 'https://github.com/agustindangelo/EEO-Tests'
                sh 'npm ci'
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
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'mochawesome-report',
                reportFiles: 'mochawesome.html',
                reportName: 'HTML Report'
            ])
            dir('eeoservice') {
                deleteDir()
            }
            dir('eeoweb') {
                deleteDir()
            }
        }
    }
}
