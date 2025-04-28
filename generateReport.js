const report = require('multiple-cucumber-html-reporter');

report.generate({
    jsonDir: "reports", // Path folder JSON hasil test
    reportPath: "reports/cucumber-html-report", // Path untuk laporan HTML
    metadata: {
        browser: {
            name: "chrome",
            version: "latest"
        },
        device: "Local Test Machine",
        platform: {
            name: "Windows",
            version: "10"
        }
    }
});

console.log("✅ Laporan HTML telah dibuat di: reports/cucumber-html-report/index.html");
