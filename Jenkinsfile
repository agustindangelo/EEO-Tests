def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]

def getBuildUser() {
    return currentBuild.rawBuild.getCause(Cause.UserIdCause).getUserId()
}


pipeline {
    //The agent section specifies where the entire Pipeline, or a specific stage, 
    //will execute in the Jenkins environment depending on where the agent section is placed.
    agent any
    
    //The environment directive specifies a sequence of key-value pairs which will be defined
    //as environment variables for all steps, or stage-specific steps, depending on where the environment directive is located within the Pipeline.
    environment {
        BUILD_USER = ''
    }
    
    //The stage directive goes in the stages section and should contain a steps section, an optional agent section, 
    //or other stage-specific directives. Practically speaking, all of the real work done by a Pipeline will be wrapped
    //in one or more stage directives.
    stages {
        stage('Test') {
            steps {
                sh "npm i"
                sh "CYPRESS_INCLUDE_TAGS=HappyPath npm run cy:run"
            }
        }
    }

    /* post { */
    /*     always { */
    /*         //The script step takes a block of Scripted Pipeline and executes that in the Declarative Pipeline.  */
    /*         //For most use-cases, the script step should be unnecessary in Declarative Pipelines, but it can provide */
    /*         //a useful "escape hatch." script blocks of non-trivial size and/or complexity should be moved into Shared Libraries instead. */
    /*         script { */
    /*             BUILD_USER = getBuildUser() */
    /*         } */
    /*          */
    /*         publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'cypress/report', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '']) */
    /*         deleteDir() */
    /*     } */
    /* } */
}
