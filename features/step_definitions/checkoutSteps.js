const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/LoginPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(50000);

let browser, page, loginPage, cartPage, checkoutPage;

// Direktori untuk menyimpan screenshot
const screenshotDir = path.join(__dirname, '../../reports/screenshots/checkoutSteps/');

// Membuat folder jika belum ada
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

// Fungsi untuk mengambil screenshot dan menyimpannya
async function takeScreenshot(stepName) {
    const screenshotPath = path.join(screenshotDir, `checkoutSteps_${stepName}.png`);

     // Cek apakah file sudah ada, jika ada maka akan ditimpa
    if (fs.existsSync(screenshotPath)) {
        fs.unlinkSync(screenshotPath); // Hapus file lama sebelum menyimpan yang baru
    }

    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot diambil: ${screenshotPath}`);
}

Given('I am logged in as {string} with password {string} and have {string} in my cart', async (username, password, itemName) => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    
    await loginPage.navigate();
    await takeScreenshot('login_page'); // Screenshot halaman login
    
    await loginPage.login(username, password);
    await takeScreenshot('logged_in'); // Screenshot setelah login
    
    const itemIndex = itemName === "Sauce Labs Backpack" ? 1 : 2;
    await cartPage.addItemToCart(itemIndex);
    await takeScreenshot('item_added_to_cart'); // Screenshot setelah item ditambahkan
    
    await cartPage.openCart();
    await takeScreenshot('cart_opened'); // Screenshot setelah membuka cart
    
    await cartPage.assertItemInCart(itemName);
    await takeScreenshot('item_verified_in_cart'); // Screenshot setelah verifikasi item dalam cart
});

When('I proceed to checkout', async () => {
    await cartPage.proceedToCheckout();
    await takeScreenshot('checkout_page'); // Screenshot halaman checkout
});

When('I enter checkout information {string}, {string}, and {string}', async (firstName, lastName, zipCode) => {
    await checkoutPage.enterCheckoutInformation(firstName, lastName, zipCode);
    await takeScreenshot('checkout_info_filled'); // Screenshot setelah mengisi informasi checkout
});

When('I continue to the overview', async () => {
    await checkoutPage.continueToOverview();
    await takeScreenshot('checkout_overview'); // Screenshot halaman ringkasan checkout
});

When('I finish the checkout', async () => {
    await checkoutPage.finishCheckout();
    await takeScreenshot('checkout_complete'); // Screenshot setelah checkout selesai
});

Then('I should see the order confirmation message {string}', async (message) => {
    await checkoutPage.assertOrderConfirmation(message);
    await takeScreenshot('order_confirmation'); // Screenshot halaman konfirmasi pesanan
    await browser.close();
});
