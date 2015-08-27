(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .controller('HackerNameDialogController', HackerNameDialogController);

  HackerNameDialogController.$inject = ['HelperService', 'HackerService', 'hackers'];

  function HackerNameDialogController(HelperService, HackerService, hackers) {

    activate.call(this);

    function activate() {
      this.hackerTemplate = HackerService.makeHackerTemplate();
      this.confirm = confirm;
      this.cancel = cancel;

      function confirm() {
        if (this.hackerTemplate.name) {
          hackers.create(this.hackerTemplate);
        } else {
          HelperService.showAlert('Please, give a name to the new hacker!');
        }
      }

      function cancel() {
        HelperService.dialogs.createHacker.hideDialog();
      }
    }
  }
})();
