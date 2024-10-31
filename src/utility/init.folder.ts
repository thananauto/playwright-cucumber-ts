const fs = require('fs-extra')

const reportDir: string = './test-results'


// Ensure the directory exists
fs.ensureDir(reportDir)
    .then(() => {
        console.log('Directory ensured:', reportDir);
    })
    .catch((err: any) => {
        console.error('Error ensuring directory:', err);
    });

// Empty the directory 
fs.emptyDir(reportDir)
    .then(() => {
    console.log('Empty the dir:', reportDir);
    })
    .catch((err: any) => {
    console.error('Error on empty the  directory:', err);
    });


