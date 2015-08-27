(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .factory('QuestionService', QuestionService);

  QuestionService.$inject = [];

  function QuestionService() {

    function Questions() {}

    Questions.prototype.make = make;
    Questions.prototype.addAnswers = addAnswers;

    var service = {
      Questions: Questions
    };

    return service;


    function make(categories, skills) {
      angular.forEach(categories, function(cVal, cKey) {
        var items;

        this[cKey] = {
          items: {},
          name: cVal.name
        };

        angular.forEach(skills, function(sVal, sKey) {
          if (cKey === sVal.category) {
            sVal.experience = {
              level: 0,
              years: 0
            };
            this[cKey].items[sKey] = sVal;
          }
        }, this);

        items = Object.keys.call(this, this[cKey].items);

        // Remove empty categories.
        if (items.length <= 0) {
          delete this[cKey];
        }
      }, this);

      return this;
    }

    function addAnswers(hacker) {
      angular.forEach(this, function(qVal, qKey) {
        angular.forEach(qVal.items, function(iVal, iKey) {
          if (hacker.answers) {
            hacker.answers.forEach(function(answer) {
              if (iKey === answer.skill) {
                iVal.experience = answer.experience;
              }
            });
          }
        });
      });
    }
  }
})();
