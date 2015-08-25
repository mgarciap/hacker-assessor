(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$firebaseAuth', '$state', 'BASE_PATH'];

  function AuthService($firebaseAuth, $state, BASE_PATH) {

    var ref = new Firebase(BASE_PATH),
      authObj = $firebaseAuth(ref);

    var service = {
      auth: function auth() {
        return authObj;
      },

      login: function login() {
        authObj.$authWithOAuthPopup("github")
          .then(function success(authData) {
            $state.go('list');
          });
      },

      logout: function logout() {
        authObj.$unauth();
        $state.go('home');
      }
    };

    return service;
  }
})();
