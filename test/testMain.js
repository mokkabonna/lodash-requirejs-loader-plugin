(function(window) {
  'use strict';

  var tests = [];

  for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
      //get all the spec files for running them later
      if (/base\/test.+Spec\.js$/.test(file)) {
        tests.push(file);
      }
    }
  }

  require({
    baseUrl: '/base/src',
    context: 'test-runner',
    paths: {
      squire: '../bower_components/Squire.js/src/Squire',
      Promise: '../bower_components/bluebird/js/browser/bluebird.min'
    },
    packages: [{
      name: 'lodash',
      location : '../bower_components/lodash'
    }]
  }, tests, function() {
    window.__karma__.start();
  });
})(window);
