class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameField = page.locator('#first-name');
        this.lastNameField = page.locator('#last-name');
        this.zipCodeField = page.locator('#postal-code');
        this.continueButton = page.locator('.cart_button:has-text("CONTINUE")');
        this.finishButton = page.locator('.cart_button:has-text("FINISH")');
        this.confirmationMessage = page.locator('.complete-header');
    }

    async enterCheckoutInformation(firstName, lastName, zipCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.fill(zipCode);
    }

    async continueToOverview() {
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async assertOrderConfirmation(expectedMessage) {
        const confirmationText = await this.confirmationMessage.innerText();
        if (!confirmationText.includes(expectedMessage)) {
            throw new Error(`Expected confirmation message "${expectedMessage}" but found "${confirmationText}"`);
        }
    }
}

module.exports = CheckoutPage;