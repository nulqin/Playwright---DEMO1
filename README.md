
# Playwright DEMO1

Playwright Demo1 is an automation testing project that simulates:

- Login Process
- Add to Cart Process
- Checkout Process

This Project is built using : 
- [Playwright](https://playwright.dev/) for browser automation ![Playwright](https://img.shields.io/badge/Playwright-Automation-blue?logo=playwright)
- [Cucumber](https://cucumber.io/) for behavior-driven development (BDD) ![Cucumber](https://img.shields.io/badge/Cucumber-BDD-yellowgreen?logo=cucumber)
- Programming language: ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)



## Key Features

- Automates login functionality.
- Adds products to the shopping cart.
- Completes the checkout process.
- Implements scenario and step definition structure using Cucumber.
- Generates reports and captures screenshots for each testing process.


## Requirement
Make sure you have installed:
- Node.js (preferably the LTS version)
- npm
- Install node_modules


## How to Run the Project

To run this project, please follow this guide.

- Clone this repository:
```bash
git clone https://github.com/nulqin/Playwright-Demo1
cd Playwright-Demo1
```
- Install all dependencies:
```bash
npm install
```

Install Playwright browsers if not yet installed:
```bash
npx playwright install
```

Run the automation tests:
```bash
npx cucumber-js
```

## Test Output

- Reports: Test results will be saved inside the reports/ folder.
- Screenshots: Automatic screenshots will be captured for each step or upon test failure.


## License

This project is free to use for educational purposes.

