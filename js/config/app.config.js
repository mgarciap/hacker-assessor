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
    });
}
