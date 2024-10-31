import { LaunchOptions, chromium, firefox, webkit } from '@playwright/test'

const launchOptions = () => {
    const launchOptions: LaunchOptions = {
        headless: (process.env.HEAD as string) == 'false',
    }
    return launchOptions
}

const browserManager = () => {
    const key = (process.env.BROWSER as string) || 'chrome'
    switch (key) {
        case 'chrome':
            return chromium.launch(launchOptions())
            break
        case 'firefox':
            return firefox.launch(launchOptions())
            break
        case 'webkit':
            return webkit.launch(launchOptions())
            break
        default:
            throw new Error(
                'Download the correct browser vendor and add the configuration'
            )
    }
}

export { browserManager }
