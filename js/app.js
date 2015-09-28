angular = require('angular');
require('angular-ui-router');

angular
  .module('hackerAssessor', ['ui.router']);

require('app.templates');
require('app.config');
require('home.controller');
