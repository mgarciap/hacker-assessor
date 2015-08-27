(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['AuthService'];

  function HomeController(AuthService) {
    activate.call(this);

    function activate() {
      this.login = login;

      function login() {
        AuthService.login();
      }
    }
  }
})();
