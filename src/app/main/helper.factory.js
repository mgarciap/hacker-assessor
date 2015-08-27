(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .factory('HelperService', HelperService);

  HelperService.$inject = ['$document', '$mdToast', '$mdDialog'];

  function HelperService($document, $mdToast, $mdDialog) {
    var service = {
      alert: {
        showToast: showToast
      },
      dialogs: {
        createHacker: {
          showDialog: showDialog,
          hideDialog: hideDialog
        }
      }
    };

    return service;

    function showToast(message) {
      return $mdToast.show({
        parent: angular.element($document[0].body),
        template: "<md-toast>" + message + "</md-toast>",
        hideDelay: 500
      });
    }

    function showDialog(hackers) {
      return $mdDialog.show({
        parent: angular.element($document[0].body),
        templateUrl: 'main/partials/hacker-name-dialog.html',
        controller: 'HackerNameDialogController',
        controllerAs: 'HackerNameDialogController',
        locals: {
          hackers: hackers
        }
      });
    }

    function hideDialog() {
      $mdDialog.hide();
    }
  }
})();
