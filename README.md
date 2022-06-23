# EEO Demos

Two automated test suites are going to be developed. 
Cypress tests are located in `cypress/e2e` and WebdriverIO tests are located in `wdio/test/specs`

# Install dependencies
```
npm install
```

# Run Cypress tests
Create a `cypress.env.json` file at the root of the project and paste with the following content:
```json
{
  "USER_EMAIL": "<your-email>",
  "USER_NAME": "<your-username>",
  "USER_PASSWORD": "<your-password>",
  "LOCAL_API_URL": "http://localhost:4000"
}
```
Make sure to have both eeoweb and eeoservice up and running before running the tests on the local environment

Run tests from the graphical test runner:
```
npm run cy:ui
```

Run the tests from the CLI and generate a Mochawesome report
```
npm run cy:run
```
tests execution reports should be available at `mochawesome-report/`

```npm run cy:run```

## Run a tagged test suite
To run a specific test suite specify its tag as follows:

bash:
```CYPRESS_INCLUDE_TAGS=HappyPath npm run cy:run```

powershell:
```cmd /C "set CYPRESS_INCLUDE_TAGS=HappyPath && npm run cy:run"```