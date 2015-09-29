'use strict';

angular
  .module('hackerAssessor')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/templates/home.template.html',
      controller: 'HomeController as HomeController'
    })
    .state('hacker', {
      url: '/hacker',
      templateUrl: '/templates/hacker.template.html',
      controller: 'HackerController as HackerController'
    });
}
