(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .controller('HackersController', HackersController);

  HackersController.$inject = ['AuthService', 'HelperService', 'hackers'];

  function HackersController(AuthService, HelperService, hackers) {

    activate.call(this);

    function activate() {
      this.hackers = hackers;

      this.destroy = function destroy(id) {
        this.hackers.destroy(id);
      };

      this.logout = function logout() {
        AuthService.logout();
      };

      this.create = function create() {
        HelperService.dialogs.createHacker.show(hackers);
      };
    }
  }
})();
