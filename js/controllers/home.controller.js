'use strict';

angular
  .module('hackerAssessor')
  .controller('HomeController', HomeController);

HomeController.$inject = ['authService'];

function HomeController(authService) {
  this.login = login.bind(this);

  function login() {
    var credentials = {
      username: this.username,
      password: this.password
    };

    authService.login(credentials);
  }
}
