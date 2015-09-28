module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '',
    /*        logLevel: 'config.LOG_DEBUG',*/
    frameworks: ['jasmine'],
    files: [
      'public/js/bundle*.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'tests/frontend/unit/**.js'
    ],
    autoWatch: true,
    singleRun: false,
    browsers: ['PhantomJS']
  });
};
