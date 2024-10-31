# Playwright with Cucumber and TypeScript
This repository provides a test automation framework that combines Playwright for end-to-end testing with Cucumber for behavior-driven development (BDD) in TypeScript. The setup allows for clear test scenarios written in Gherkin syntax and is designed to be flexible, scalable, and compatible with modern web applications

## Table of Contents
  * Features
  * Project Structure
  * Setup and Installation
  * Running Tests
  * License


### Features
* **End-to-End Testing:** Automated UI testing for web applications using * * Playwright.
* **BDD Style:** Cucumber enables tests to be written in plain language using the Gherkin syntax.
* **TypeScript:** Type-safe code with support for modern JavaScript features.
* **Cross-Browser Testing:** Run tests across Chromium, Firefox, and WebKit browsers.
* **Report Generation:** Generates reports for test results.

### Project Structure
The core directories and files are organized as follows:
```
playwright-cucumber-ts/
├── src/
│   ├── test/features/           # Cucumber feature files
│   ├── test/steps/              # Step definitions for Cucumber steps
│   ├── test/pom/                # Page Object Model (POM) classes
│   ├── utility/                
│   │   ├── browser.factory.ts   # Global test hooks
│   │   ├── init.folder.ts       # clean up report folders before every run
|   |   ├── report-generator.ts  # code to create html report at end
|   ├── environment/ 
|   |   ├── .env.{test | prod}   # Environment variables to set URL, BROWSER, TRACE and HEAD mode
|   ├── hooks/
|       ├── custom.world.ts      # sharing the state across multiple step definition
|       ├── hook.ts              # code for setup and attach the screenshot for every failure
├── package.json                 # Project dependencies and scripts
└── tsconfig.json                # TypeScript configuration
```

## Setup and Installation
### Prerequisites
* **Node.js:** Ensure Node.js is installed (v14 or later).
* **Playwright Browsers:** Playwright will automatically install necessary browsers.

### Installation
Clone the repository and install the dependencies:
```
git clone https://github.com/thananauto/playwright-cucumber-ts.git
cd playwright-cucumber-ts
npm install
```

### Browser Setup
Run the following command to install the required browsers:
```
npx playwright install
```
## Running Tests
You can run the tests using the following commands:
* **Run All Tests:**
```
npm test
```
* **Run Tests with Tags:** 
`@catalog`, `@positive` and `@negative` - these tags are mapped in feature file
```
npm test --TAGS=@catalog # Execute scenarios tagged  with `catalog`
npm test                 # Execute all scenarios
```

* **Run tests in different  environment:**
Update the `ENV` value as `{test | prod }` in `test` command of `package.json` 
```
script :{
  test: "cross-env ENV=test FORCE_COLOR=0 cucumber-js test || exit 0",
}

npm test
```
### Formatting
To enforce consistent coding styles, catch syntax errors, and highlight potential issues, run these commands
```
npm run lint
npm run prettier
```
### Rerun
If we want to execute the failed case alone after first run, execute the below command
```
npm run test:failed
```
## Reporting
The html report can be found in the folder `./test-results/index.html`, the file carries the information of test like Passed, Failed, Skipped, Screenshot, Traces and execution device information.


## License
This project is open-source and available under the MIT License.
