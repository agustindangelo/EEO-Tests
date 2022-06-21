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

With the graphical test runner:
```
npm run cy:ui
```

Run the tests from the CLI and generate Mochawesome report
```
npm run cy:run
```
tests execution reports should be available at `mochawesome-report/`

# Run WebdriverIO tests
```
npm run wdio
```
