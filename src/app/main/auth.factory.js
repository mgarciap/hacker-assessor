(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$firebaseAuth', '$state', 'BASE_PATH'];

  function AuthService($firebaseAuth, $state, BASE_PATH) {

    var ref = new Firebase(BASE_PATH);
    var authObj = $firebaseAuth(ref);

    var service = {
      auth: auth,
      login: login,
      logout: logout
    };

    return service;

    function auth() {
      return authObj;
    }

    function login() {
      authObj.$authWithOAuthPopup("github")
        .then(function success(authData) {
          $state.go('list');
        });
    }

    function logout() {
      authObj.$unauth();
      $state.go('home');
    }
  }
})();
