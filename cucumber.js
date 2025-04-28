module.exports = {
    default: {
      require: ["features/step_definitions/*.js"],
      format: [
        "json:reports/cucumber-report.json",
        "html:reports/cucumber-report.html"
      ],
      worldParameters: {
        browser: "chromium"
      },
      publishQuiet: true
    }
  };
  