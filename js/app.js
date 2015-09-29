'use strict';

angular = require('angular');
require('angular-ui-router');

angular
  .module('hackerAssessor', ['ui.router']);

require('app.templates');
require('app.config');
require('app.run');
require('home.controller');
require('hacker.controller');
require('auth.service');
require('hacker.service');
