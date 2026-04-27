module.exports = function(config) {
  "use strict";

  config.set({
    frameworks: ["ui5"],

    ui5: {
      url: "https://sapui5.hana.ondemand.com"
    },

    preprocessors: {
      "{webapp,webapp/!(test)}/!(mock*).js": ["coverage"]
    },

    reporters: ["progress", "junit", "coverage"],

    junitReporter: {
      outputDir: "reports",
      outputFile: "TESTS-karma.xml",
      useBrowserName: false
    },

    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "lcov", subdir: "." },
        { type: "text-summary" }
      ]
    },

    // ✅ USE SELENIUM CHROME (NOT LOCAL CHROMIUM)
    browsers: ["ChromeHeadless"],

    customLaunchers: {
      ChromeHeadless: {
        base: "Chrome",
        flags: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu"
        ]
      }
    },

    browserConsoleLogOptions: {
      level: "error"
    },

    singleRun: true
  });
};