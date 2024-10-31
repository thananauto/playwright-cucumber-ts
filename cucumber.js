const commonParams ={
    requireModule : ['ts-node/register'],
    formatOptions : {
        snippetInterface : 'async-await'
    },
    paths : [
        'src/test/features/'
    ],
     require : [
            'src/test/steps/*.ts', 
            'src/hooks/hook.ts'],
}

module.exports ={
    default: {
        ...commonParams,
        tags: process.env.npm_config_TAGS || "",
        dryRun : false,
        format : [
            'rerun:@rerun.txt',
            'html:test-results/cucumber-report.html',
            'progress-bar',
            'json:test-results/cucumber-report.json' 
        ],
        parallel : 1
    },
    rerun: {
        ...commonParams,
            dryRun : false,
            format : [
                'html:test-results/cucumber-report-failed.html',
                'progress-bar',
                'json:test-results/cucumber-report-fail.json' 
            ],
            parallel : 1
        }
    

}