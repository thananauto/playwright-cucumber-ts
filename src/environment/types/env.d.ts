export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: 'chrome' | 'firefox' | 'webkit'
            ENV: 'prod' | 'stage' | 'test'
            BASEURL: string
            HEAD: string
            TRACE: 'on' | 'off'
        }
    }
}
