import { type Page, expect } from '@playwright/test'
import { CustomWorld } from '../../hooks/custom.world'

class CatalogPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async searchKeyword(searchTxt: string) {
        await this.page.getByLabel('Search', { exact: true }).click()
        await this.page
            .getByRole('searchbox', { name: 'Search input' })
            .fill(searchTxt)
        await this.page
            .getByRole('searchbox', { name: 'Search input' })
            .press('Enter')
        // await expect(this.page.locator('div > h1.chakra-heading')).toContainText(searchTxt)
        await this.page.waitForLoadState('domcontentloaded')
        await expect(
            this.page.getByRole('heading', { name: 'Search results for' })
        ).toContainText(searchTxt, { timeout: 10000 })
    }

    async selectLeftMenuDropDown(text: string) {
        await this.page.getByRole('button', { name: text, exact: true }).click()
    }

    async captureNetworkResponse(world: CustomWorld, searchText: string) {
        this.page.on('response', async (response) => {
            if (
                response
                    .url()
                    .includes(`/${searchText.replace(' ', '%20')}/`) &&
                response.request().method().includes('GET')
            ) {
                const json = await response.json()
                //console.log(json.pageProps.catalogSearchResults.searchResultItems)
                const subJson =
                    json['pageProps']['catalogSearchResults'][
                        'searchResultItems'
                    ]

                const jsonOP = subJson.map((ele: any) => {
                    return {
                        title: ele.title,
                        duration: ele.duration,
                        difficultyLevel: ele.difficultyLevel,
                        numberOfReviews: ele.reviewSummary.numberOfReviews,
                        starsAverage: ele.reviewSummary.starsAverage,
                    }
                })
                console.log(`Response captured ${jsonOP.length}`)
                world.apiResponse = jsonOP
            }
        })
    }

    async enterTypeToSearch(
        world: CustomWorld,
        text: string,
        menuName: string
    ) {
        await this.captureNetworkResponse(world, text)
        await this.page
            .getByRole('region', { name: menuName })
            .getByRole('combobox')
            .fill(text)
        await this.page
            .getByRole('region', { name: menuName })
            .getByRole('combobox')
            .press('Enter')
        text = text.charAt(0).toUpperCase() + text.slice(1)
        await expect(
            this.page.getByRole('button', { name: text })
        ).toBeVisible()
    }

    async searchResults() {
        await this.page.waitForLoadState('load')
        await expect(this.page.locator('article[role]').first()).toBeVisible({
            timeout: 10000,
        })
        const elements = await this.page.locator('article[role]').all()
        expect(elements.length).toBeGreaterThanOrEqual(1)
    }

    async fetchUIResults(world: CustomWorld) {
        await this.page.waitForTimeout(3000)
        const elements = await this.page.locator('article[role]').all()
        console.log(`Size: ${elements.length}`)

        const uiResults: any = await Promise.all(
            elements.map(async (ele) => {
                const title = await ele
                    .locator('a.chakra-heading')
                    .textContent()
                const metadata = await ele
                    .locator('div.chakra-stack')
                    .textContent()
                return {
                    title: title,
                    metadata: metadata,
                }
            })
        )
        world.uiResponse = uiResults
    }

    async validateNoResultPage(message: string) {
        const regex = new RegExp(message, 'i')
        await expect(
            this.page.getByRole('heading', { name: regex })
        ).toBeVisible({ timeout: 10000 })
    }

    async compareUIAndAPIRes(world: CustomWorld) {
        expect(world.apiResponse.length).toEqual(world.uiResponse.length)

        world.uiResponse.forEach((uiItem) => {
            // Find the corresponding item in jsonOP by title
            const jsonOpItem = world.apiResponse.find(
                (item) => item.title === uiItem.title
            )

            expect.soft(jsonOpItem?.title).toEqual(uiItem.title)
            if (jsonOpItem) {
                // Build the expected metadata string from jsonOP
                const expectedMetadata =
                    jsonOpItem.numberOfReviews > 0
                        ? `(${jsonOpItem.numberOfReviews})${jsonOpItem.duration}, ${jsonOpItem.difficultyLevel}`
                        : `${jsonOpItem.duration}, ${jsonOpItem.difficultyLevel}`

                expect.soft(uiItem.metadata).toEqual(expectedMetadata)
            }
        })
    }
}

export { CatalogPage }
