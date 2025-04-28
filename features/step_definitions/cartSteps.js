const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const LoginPage = require('../../pages/LoginPage');
const CartPage = require('../../pages/CartPage');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(50000);

let browser, page, loginPage, cartPage;

// Direktori untuk menyimpan screenshot
const screenshotDir = path.join(__dirname, '../../reports/screenshots/cartSteps/');

// Membuat folder jika belum ada
if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
}

// Fungsi untuk mengambil screenshot dan menyimpannya dalam direktori yang lebih rapi
async function takeScreenshot(stepName) {
    const screenshotPath = path.join(screenshotDir, `cartSteps_${stepName}.png`);

      // Cek apakah file sudah ada, jika ada maka akan ditimpa
    if (fs.existsSync(screenshotPath)) {
        fs.unlinkSync(screenshotPath); // Hapus file lama sebelum menyimpan yang baru
    }

    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot diambil: ${screenshotPath}`);
}

// Scenario: Login sebelum menambahkan barang ke cart
Given('I am logged in as {string} with password {string}', async (username, password) => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
    await takeScreenshot('login_page'); // Screenshot halaman login
    await loginPage.login(username, password);
    await takeScreenshot('logged_in'); // Screenshot setelah login
});

// Scenario: Menambahkan barang ke cart
When('I add the item {string} to the cart', async (itemName) => {
    const itemIndex = itemName === "Sauce Labs Backpack" ? 1 : 2;
    await cartPage.addItemToCart(itemIndex);
    await takeScreenshot('item_added_to_cart'); // Screenshot setelah item ditambahkan
});

// Scenario: Memeriksa barang di cart
Then('I should see {string} in the cart', async (itemName) => {
    await cartPage.openCart();
    await takeScreenshot('cart_opened'); // Screenshot setelah membuka cart
    await cartPage.assertItemInCart(itemName);
    await takeScreenshot('item_in_cart'); // Screenshot barang di cart
    await browser.close();
});

// Scenario: Memastikan barang ada di cart sebelum dihapus
Given('I have {string} in my cart', async (itemName) => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    const itemIndex = itemName === "Sauce Labs Backpack" ? 1 : 2;
    await cartPage.addItemToCart(itemIndex);
    await cartPage.openCart();
    await takeScreenshot('item_added_and_cart_opened'); // Screenshot sebelum menghapus item
    await cartPage.assertItemInCart(itemName);
});

// Scenario: Menghapus barang dari cart
When('I remove the item {string} from the cart', async (itemName) => {
    const itemIndex = itemName === "Sauce Labs Backpack" ? 1 : 2;
    await cartPage.removeItemFromCart(itemIndex);
    await takeScreenshot('item_removed_from_cart'); // Screenshot setelah item dihapus
});

// Scenario: Memastikan barang sudah tidak ada di cart
Then('I should not see {string} in the cart', async (itemName) => {
    await cartPage.assertItemNotInCart(itemName);
    await takeScreenshot('cart_after_removal'); // Screenshot setelah penghapusan item
    await browser.close();
});
