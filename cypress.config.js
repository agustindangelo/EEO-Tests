const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'qnych8',
    // use mochawesome reporter as usually
  reporter: "mochawesome",
  reporterOptions: {
    // disable overwrite to generate many JSON reports
    "overwrite": false,
    // do not generate intermediate HTML reports
    "html": false,
    // generate intermediate JSON reports
    "json": true
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        
      })
    },
    specPattern: 'cypress/e2e/**/*.spec.js',
    baseUrl: 'http://localhost:3000/',
    watchForFileChanges: true,
    defaultCommandTimeout: 4000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false
  },
});
