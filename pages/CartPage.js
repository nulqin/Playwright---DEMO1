const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = (itemIndex) => this.page.locator(`(//button[text()='ADD TO CART'])[${itemIndex}]`);
        this.removeFromCartButton = (itemIndex) => this.page.locator(`(//button[text()='REMOVE'])[${itemIndex}]`);
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartItem = (itemName) => page.locator(`.cart_item:has-text("${itemName}")`);
        this.checkoutButton = page.locator('.checkout_button'); 
    }

    async addItemToCart(itemIndex) {
        const addButton = this.addToCartButton(itemIndex);
        await addButton.waitFor({ state: 'visible' });
        await addButton.click();
    }

    async removeItemFromCart(itemIndex) {
        const removeButton = this.removeFromCartButton(itemIndex);
        await removeButton.waitFor({ state: 'visible' });
        await removeButton.click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async assertItemInCart(itemName) {
        const cartItem = this.cartItem(itemName);
        await expect(cartItem).toBeVisible();
    }

    async assertItemNotInCart(itemName) {
        const cartItem = this.cartItem(itemName);
        await expect(cartItem).not.toBeVisible();
    }

    // Add this method
    async proceedToCheckout() {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;