import {
    BeforeAll,
    AfterAll,
    Before,
    After,
    Status,
    setDefaultTimeout,
} from '@cucumber/cucumber'
import { Browser } from '@playwright/test'
import { browserManager } from '../utility/browser.factory'
import { getEnv } from '../environment/env'

import { CustomWorld, setWorldConstructor } from './custom.world'
setDefaultTimeout(60 * 1000 * 2)
setWorldConstructor(CustomWorld)

let browser: Browser

BeforeAll(async () => {
    //load the env file
    getEnv()
    //get the browser context
    browser = await browserManager()
})

Before(async function (this: CustomWorld, { pickle }) {
    await this.init(browser, pickle)
})

After(async function (this: CustomWorld, { pickle, result }) {
    //take screenshot for failed step

    if (result?.status == Status.FAILED) {
        const img = await this.page.screenshot({
            path: `./test-results/screenshots/${pickle.name}.png`,
            type: 'png',
        })
        this.attach(img, 'image/png')
    }
    await this.tearDown(pickle)
})

AfterAll(async function () {
    await browser.close()
})
