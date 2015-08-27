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
      this.destroy = destroy;
      this.logout = logout;
      this.create = create;

      function destroy(id) {
        this.hackers.destroy(id);
      }

      function logout() {
        AuthService.logout();
      }

      function create() {
        HelperService.dialogs.createHacker.showDialog(hackers);
      }
    }
  }
})();
