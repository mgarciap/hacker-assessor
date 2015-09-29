"use strict";

angular
  .module('hackerAssessor')
  .run(run);

function run($rootScope, $state, authService) {
  $rootScope.$on("$routeChangeStart", routeChangeStartHandler);

  function routeChangeStartHandler(event, next) {
    if (!authService.isLoggedIn()) {
      $state.go("home");
    }
  }
}
