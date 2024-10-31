import { Given } from '@cucumber/cucumber'
import { CustomWorld } from '../../hooks/custom.world'

Given('Launch the sauce lab application', async function (this: CustomWorld) {
    await this.homePage.launchApplication()
})
