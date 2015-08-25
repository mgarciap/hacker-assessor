(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .factory('HelperService', HelperService);

  HelperService.$inject = ['$document', '$mdToast', '$mdDialog'];

  function HelperService($document, $mdToast, $mdDialog) {
    var service = {
      alert: {
        show: function show(message) {
          return $mdToast.show({
            parent: angular.element($document[0].body),
            template: "<md-toast>" + message + "</md-toast>",
            hideDelay: 500
          });
        }
      },

      dialogs: {
        createHacker: {
          show: function show(hackers) {
            return $mdDialog.show({
              parent: angular.element($document[0].body),
              templateUrl: 'main/partials/hacker-name-dialog.html',
              controller: 'HackerNameDialogController',
              controllerAs: 'HackerNameDialogController',
              locals: {
                hackers: hackers
              }
            });
          },

          hide: function hide() {
            $mdDialog.hide();
          }
        }
      }
    };

    return service;
  }
})();
