(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .directive('haQuestion', haQuestion);

  function haQuestion() {
    var directive = {
      restrict: 'E',
      templateUrl: 'main/partials/ha-question.html',
      scope: {
        skill: '=',
        question: '=',
        save: '&'
      },
      controller: QuestionController
    };

    return directive;
  }

  QuestionController.$inject = ['$scope'];

  function QuestionController($scope) {
    $scope.$watch('question', save, true);

    function save() {
      $scope.save({
        states: arguments,
        id: $scope.skill
      });
    }
  }
})();
