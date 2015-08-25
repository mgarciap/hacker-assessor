(function() {
  'use strict';

  angular
    .module('hackerAssessor')
    .run(run);

  function run($rootScope, $state) {
    /**
     * Pelase refer to the official documentation for more
     * on the argument list passed to the callback.
     *
     * https://github.com/angular-ui/ui-router/wiki#state-change-events
     */
    $rootScope.$on('$stateChangeError', function() {
      arguments[0].preventDefault();

      /**
       * Catch the error thrown when the $requireAuth promise is
       * rejected and redirect the user back to the home page.
       */
      if (arguments[5] === "AUTH_REQUIRED") {
        $state.go("home");
      }

      console.error(arguments[5].stack);
    });
  }
})();
