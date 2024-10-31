import { Given, When, Then } from '@cucumber/cucumber'
import { CustomWorld } from '../../hooks/custom.world'

Given(
    'the application is loaded successfully',
    async function (this: CustomWorld) {
        await this.homePage.launchApplication()
    }
)

Given(
    'user search for {string}',
    async function (this: CustomWorld, searchTxt) {
        await this.catalogPage.searchKeyword(searchTxt)
    }
)

Given(
    'user clicks on {string} Dropdown',
    async function (this: CustomWorld, dropDownTxt) {
        await this.catalogPage.selectLeftMenuDropDown(dropDownTxt)
    }
)

When(
    'user search for {string} in {string} Dropdown',
    async function (this: CustomWorld, searchTxt, subMenuName) {
        await this.catalogPage.enterTypeToSearch(this, searchTxt, subMenuName)
    }
)

Then(
    'user sees results matching the search term in the UI',
    async function (this: CustomWorld) {
        await this.catalogPage.searchResults()
    }
)

Then(
    'user fetch search results from the UI',
    async function (this: CustomWorld) {
        await this.catalogPage.fetchUIResults(this)
    }
)

Then(
    'user should see a {string} message',
    async function (this: CustomWorld, message) {
        await this.catalogPage.validateNoResultPage(message)
    }
)

Then(
    'the UI results should match the API results',
    async function (this: CustomWorld) {
        await this.catalogPage.compareUIAndAPIRes(this)
    }
)
