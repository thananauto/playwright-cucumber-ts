import { type Page, expect } from '@playwright/test'

class HomePage {
    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async launchApplication() {
        await this.page.goto(process.env.BASEURL as string, {
            waitUntil: 'domcontentloaded',
        })
        await expect(
            this.page.getByRole('heading', {
                name: /all programs/i,
                exact: true,
            })
        ).toBeVisible()
    }

    async loginWithCredentials(username: string, password: string) {
        await this.page
            .getByRole('textbox', { name: 'Username' })
            .fill(username)
        await this.page
            .getByRole('textbox', { name: 'Password' })
            .fill(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }

    async verifyHomePage() {
        const title = await this.page
            .locator('.title')
            .getAttribute('data-test')
        expect(title).toEqual('title')
    }
}

export { HomePage }
