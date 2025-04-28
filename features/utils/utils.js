const fs = require('fs');
const path = require('path');

async function takeScreenshot(page, scenarioFileName, stepName) {
    const dirPath = path.join('reports/screenshots', scenarioFileName);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const screenshotPath = path.join(dirPath, `${Date.now()}_${stepName}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot diambil: ${screenshotPath}`);
}

module.exports = { takeScreenshot };
