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

    reporters: ['progress', 'coverage', 'junit'],

    coverageReporter: {
      dir: 'reports',
      reporters: [
        { type: 'cobertura', subdir: 'coverage', file: 'coverage.xml' },
        { type: 'lcov', subdir: 'coverage' },
        { type: 'text-summary' }
      ]
    },

    junitReporter: {
      outputDir: 'reports',
      outputFile: 'TESTS-karma.xml',
      useBrowserName: false
    },

    browsers: ['SeleniumChrome'],

    hostname: '0.0.0.0', 
    listenAddress: '0.0.0.0',

    customLaunchers: {
      SeleniumChrome: {
        base: 'WebDriver',
        config: {
          hostname: process.env.PIPER_SELENIUM_WEBDRIVER_HOSTNAME || 'selenium',
          port: 4444
        },
        browserName: 'chrome',
        name: 'Karma test'
      }
    },

    protocol: 'http:',
    singleRun: true,

     plugins: [
      'karma-ui5', 
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-junit-reporter',
      'karma-browserify',
      'karma-coverage',
      'karma-webdriver-launcher'
    ]
  });
};