(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .controller('HackerController', HackerController);

  HackerController.$inject = ['QuestionService', 'hacker', 'categories', 'skills'];

  function HackerController(QuestionService, hacker, categories, skills) {

    activate.call(this);

    function activate() {
      this.hacker = hacker;
      this.save = save;
      this.questions = new QuestionService.Questions();
      this.questions.make(categories, skills);
      this.questions.addAnswers(this.hacker);

      /**
       * Manually updated because it isn't possible to use $bindTo() without $scope.
       * For more details, please refer to the discussion linked below.
       * https://groups.google.com/d/topic/firebase-angular/zd0bV2brXtY/discussion
       */
      function save() {
        this.hacker.save();
      }
    }
  }
})();
