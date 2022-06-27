def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]

pipeline {

    agent any

    options {
        ansiColor('xterm')
    }

    parameters {
        choice(
            name: 'TAG',
            choices: ['EntireSuite', 'Login', 'HappyPath'],
            defaultValue: 'EntireSuite',
            description: 'Specify which tests to run by providing a tag to the test runner'
        ),
    }
    
    stages {
        stage('Install dependencies') {
            steps {
                sh "npm install"
                dir("/home/adangelo/code/pass-it-on-demos") {
                    // bring on the environment variables from the local repo
                    fileOperations([fileCopyOperation(excludes: '', flattenFiles: true, includes: 'cypress.env*', targetLocation: "${WORKSPACE}")])
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
                sh "CYPRESS_INCLUDE_TAGS=${TAG} npm run cy:run"
            }
        }

        stage('Run the entire test suite') {
            when {
                expression {
                    return params.tag == 'EntireSuite'
                }
            }
            steps {
                sh "npm run cy:run"
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
