'use strict';

angular
  .module('hackerAssessor')
  .service('authService', authService);

authService.$inject = ['$http'];

function authService($http) {
  this.user = null;
  this.isLoggedIn= isLoggedIn;
  this.login = login.bind(this);

  function login(credentials) {
    var body = {
      hacker: {
        name: credentials.username,
        password: credentials.password
      }
    }

    $http.post('/login', body)
      .then(success.bind(this), error);

    function success(response) {
      this.user = response.data;
    }

    function error(response) {
      alert('error');
    }
  }

  function isLoggedIn() {
    return this.user !== null;
  }
}
