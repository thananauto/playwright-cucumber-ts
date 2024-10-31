import { World, setWorldConstructor } from '@cucumber/cucumber'
import { CatalogPage, HomePage } from '../test/pom/pages'
import { Browser, BrowserContext, Page } from '@playwright/test'
import { Pickle } from '@cucumber/messages'

interface JsonFormat {
    title: string
    duration: string
    difficultyLevel: string
    numberOfReviews: number
    starsAverage: number
}

interface UIFormat {
    title: string
    metadata: string
}

class CustomWorld extends World {
    page: Page
    context: BrowserContext

    homePage: HomePage
    catalogPage: CatalogPage
    apiResponse: JsonFormat[] = []
    uiResponse: UIFormat[] = []

    constructor(opts: any) {
        super(opts)
    }

    async init(browser: Browser, pickle: Pickle) {
        this.context = await browser.newContext()

        if ((process.env.TRACE as string) == 'on') {
            await this.startTrace(this.context, pickle)
        }
        this.page = await this.context.newPage()
        this.homePage = new HomePage(this.page)
        this.catalogPage = new CatalogPage(this.page)
    }

    async startTrace(context: BrowserContext, pickle: Pickle) {
        await context.tracing.start({
            name: pickle.name + pickle.id,
            title: pickle.name,
            sources: true,
            screenshots: true,
            snapshots: true,
        })
    }

    async stopTrace(pickle: Pickle) {
        const path = `./test-results/trace/${pickle.id}.zip`
        await this.context.tracing.stop({ path: path })
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
        this.attach(`Trace file: ${traceFileLink}`, 'text/html')
    }

    async tearDown(pickle: Pickle) {
        if ((process.env.TRACE as string) == 'on') {
            await this.stopTrace(pickle)
        }
        await this.page.close()
        await this.context.close()
    }
}
export { CustomWorld, setWorldConstructor }
