module.exports = function(config) {
  "use strict";

  config.set({
    frameworks: ['browserify', 'mocha'],
    ui5: {
      url: "https://sapui5.hana.ondemand.com"
    },

     files: [
      'test/**/*.js' 
    ],

    preprocessors: {
      // If you are using UI5, coverage usually targets the webapp folder
      "webapp/**/*.js": ["coverage"],
      "test/**/*.js": ["browserify"]
    },

    reporters: ['progress', 'coverage', 'junit', 'sonarqubeUnit'],

    coverageReporter: {
      dir: 'reports',
      reporters: [
        { type: 'cobertura', subdir: 'coverage', file: 'coverage.xml' },
        { type: 'lcov',      subdir: 'coverage' },
        { type: 'text-summary' }
      ]
    },

    junitReporter: {
      outputDir: 'reports',
      outputFile: 'TESTS-karma.xml',
      useBrowserName: false,
      suite: 'KarmaTests'
    },

    // Generates SonarQube Generic Test Execution XML directly
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputFile: 'reports/test-execution.xml',
      overrideTestDescription: true,
      testPaths: ['test'],
      testFilePattern: '.js', 
      useBrowserName: false
    },

    port: 9876,
    hostname: process.env.PIPER_SELENIUM_HOSTNAME || '0.0.0.0',
     
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,

    browsers: ['SeleniumChrome'],

    customLaunchers: {
      SeleniumChrome: {
        base: 'WebDriver',
        config: {
          hostname: process.env.PIPER_SELENIUM_WEBDRIVER_HOSTNAME || 'selenium',
          port: parseInt(process.env.PIPER_SELENIUM_WEBDRIVER_PORT) || 4444
        },
        browserName: 'chrome',
        name: 'Karma',
        flags: ['--no-sandbox', '--disable-dev-shm-usage'],
        pseudoActivityInterval: 30000
      }
    },

    captureTimeout: 210000,
    browserDisconnectTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 210000,
    reportSlowerThan: 500,

     plugins: [
      'karma-ui5', 
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-junit-reporter',
      'karma-browserify',
      'karma-coverage',
      'karma-webdriver-launcher',
      'karma-sonarqube-unit-reporter'  
    ],
    
    concurrency: 1,
    forceJSONP: true
  });
};