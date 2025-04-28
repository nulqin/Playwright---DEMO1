const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/LoginPage');
const fs = require('fs');
const path = require('path');

let browser, page, loginPage;

// Direktori untuk menyimpan screenshot
const screenshotDir = path.join(__dirname, '../../reports/screenshots/loginSteps/');

// Membuat folder jika belum ada
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

// Fungsi untuk mengambil screenshot dan menyimpannya
async function takeScreenshot(stepName) {
    const screenshotPath = path.join(screenshotDir, `loginSteps_${stepName}.png`);
    
    // Cek apakah file sudah ada, jika ada maka akan ditimpa
    if (fs.existsSync(screenshotPath)) {
        fs.unlinkSync(screenshotPath); // Hapus file lama sebelum menyimpan yang baru
    }
    
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot diambil: ${screenshotPath}`);
}

// Scenario: Berada di halaman login
Given('I am on the SauceDemo login page', async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await takeScreenshot('login_page'); // Screenshot halaman login
});

// Scenario: Login dengan kredensial valid
When('I login with valid credentials {string} and {string}', async (username, password) => {
    await loginPage.login(username, password);
    await takeScreenshot('login_attempt'); // Screenshot saat login dilakukan
});

Then('I should see the products page', async () => {
    await loginPage.assertProductsPage();
    await takeScreenshot('products_page'); // Screenshot halaman setelah login sukses
    await browser.close();
});

// Scenario: Login dengan kredensial tidak valid
When('I login with invalid credentials {string} and {string}', async (username, password) => {
    await loginPage.login(username, password);
    await takeScreenshot('invalid_login_attempt'); // Screenshot login gagal
});

Then('I should see an error message {string}', async (message) => {
    await loginPage.assertErrorMessage(message);
    await takeScreenshot('error_message'); // Screenshot pesan error
    await browser.close();
});
