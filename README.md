# EEO Demos

## Install dependencies
```
npm install
```

# Run Cypress tests
1. Create a `cypress.env.json` file at the root of the project and paste with the following content:
```json
{
  "USER_EMAIL": "<your-email>",
  "USER_NAME": "<your-username>",
  "USER_PASSWORD": "<your-password>",
  "LOCAL_API_URL": "http://localhost:4000"
}
```
2. Make sure to have both eeoweb and eeoservice up and running before running the tests on the local environment

To run the tests from the graphical test runner:
```
npm run cy:ui
```

Run the tests from the CLI and generate a Mochawesome report
```
npm run cy:run
```
tests execution reports should be available at `mochawesome-report/`

## Run a tagged test suite
To run a specific test suite specify its tag as follows:

bash:
```CYPRESS_INCLUDE_TAGS=HappyPath npm run cy:run```

powershell:
```cmd /C "set CYPRESS_INCLUDE_TAGS=HappyPath && npm run cy:run"```

<br>

# Setup a Jenkins local instance
1. Download the [latest stable Jenkins WAR file](https://www.jenkins.io/download/) to an appropriate directory on your machine.
2. Run the jenkins instance with `java -Dhudson.model.DirectoryBrowserSupport.CSP="" -jar jenkins.war` and navigate to `http://localhost:8080`. The first time you will be asked for a password. Refer to the official documentation for any inconveniences: https://www.jenkins.io/doc/book/installing/war-file/
3. Once you have logged into Jenkins, go to `Manage Jenkins` > `Manage Plugins` > Click on `Available` and install the following plugins:
- AnsiColor: to colorize jobs terminal output on the Jenkins UI.
- NodeJS plugin: to set up Node in your Jenkins instance in order to run Node commands during build steps.
- HTML publisher: to publish HTML test reports after the builds. 
4. After restarting Go to `Manage Jenkins` > `Global Tool Configuration` > Scroll down to NodeJS and Add a NodeJS installation. You can use the one available in your system by unchecking `Install automatically` and providing the path to your NodeJS installation. As I was running Ubuntu and I installed NodeJS with NVM, my NodeJS installation was in `/home/adangelo/.nvm/versions/node/v16.15.0/` so I named the installation `local-16.15.0`. We will use this later name in our pipeline definition. If you are on Windows, you can check where your NodeJS installation is located by executing `where.exe node` from the command line.
5. Now, go back to the Jenkins Dashboard and create a new pipeline by clicking the `New Item` button on the Jenkins' UI. You can name something like it "eeo-pipeline".
6. On the pipeline configuration page, scroll down to the **Pipeline** section or click on the **Pipeline** tab.
7. On the **Definition** field, select "Pipeline script from SCM"
8. On the SCM field, select Git.
9. On the repository URL, enter the GitHub repo URL: https://github.com/agustindangelo/EEO-Tests.
![SCM Pipeline setting](docs/pipeline-settings.png)
10. In the **Script Path** field, type "Jenkinsfile" and Save the pipeline.
11. From the Jenkins Dashboard, navigate to `Manage Jenkins` > `Credentials`, click on the Jenkins entry below the **Stores scoped to Jenkins** dialog, click on `Global credentials (unrestricted)`, click on `+ Add Credentials` and create a **Secret text** type of credential with ID `USER_PASSWORD` and type your EEO password as secret value.
12. Repeat the previous step and create a credential to store Cypress dashboard API key. Name it `CYPRESS_DASHBOARD_API_KEY`.
13. From the Jenkins dashboard, click on your recently created pipeline and click on the **Build now** button. The first build will fail as Jenkins continues the build without assigning the pipeline parameters. From now on, the **Build now** button should display **Build now with parameters**.
