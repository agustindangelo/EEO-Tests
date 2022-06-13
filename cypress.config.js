const { defineConfig } = require("cypress");

module.exports = defineConfig({
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
