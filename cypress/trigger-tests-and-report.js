const cypress = require('cypress')
const marge = require('mochawesome-report-generator')
const { merge } = require('mochawesome-merge')

async function generateReport(options) {
    return merge(options).then(report => marge.create(report, options))
}

async function runCypressTests() {
    const runOptions = await cypress.cli.parseRunArguments(process.argv.slice(2))

    cypress.run(runOptions).then(
        () => {
            generateReport()
        },
        error => {
            generateReport()
            console.error(error)
            process.exit(1)
        }
    )
}

runCypressTests();
