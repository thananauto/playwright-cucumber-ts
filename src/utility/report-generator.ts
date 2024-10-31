const report = require('multiple-cucumber-html-reporter')
const os = require('os')

report.generate({
    jsonDir: './test-results/',
    reportPath: './test-results/',
    reportName: 'Udacity',
    pageTitle: 'Automation Summary Report',
    displayDuration: true,
    metadata: {
        device: os.hostname(),
        platform: {
            name: os.platform(),
            version: os.release() + ' ' + os.arch(),
        },
    },
    customData: {
        title: 'Run info',
        data: [
            { label: 'Project', value: 'Udacity' },
            { label: 'Release', value: 'v1.0.0' },
            { label: 'Cycle', value: 'Regression 1' },
        ],
    },
})
