(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .factory('SeniorityService', SeniorityService);

  SeniorityService.$inject = ['$q', '$firebaseObject', 'BASE_PATH'];

  function SeniorityService($q, $firebaseObject, BASE_PATH) {
    var ref = new Firebase(BASE_PATH + "seniorities");

    var service = {
      seniorities: {},
      getOne: getOne,
      getAll: getAll,
      is: is
    };

    return service;

    function getOne(id) {
      if (this.seniorities[id]) {
        return $q.when(this.seniorities[id]);
      }
      return $firebaseObject(ref.child(id)).$loaded();
    }

    function getAll() {
      function loaded(seniorities) {
        this.seniorities = seniorities;
        return this.seniorities;
      }

      return $firebaseObject(ref).$loaded(loaded.bind(this));
    }

    /**
     * Tells if a hacker has a seniority and the skills that the hacker
     * requires for the seniority.
     *
     * @param  {Object}  answers       A Firebase hacker reference synced as an object.
     * @param  {Object}  skills_obj       A Firebase skills reference synced as an object.
     * @param  {String}  seniority_id     A Firebase seniority child reference key.
     * @return {Object.<boolean, object>}
     */
    function is(answers, seniority_id, skills_obj) {
      var requires = [];
      var answers_skills = [];

      if (!(answers instanceof Array)) {
        answers = [];
      }

      answers.forEach(function(answer, index) {
        if (answer.experience.level === 3) {
          answers_skills.push(answer.skill);
        }
      });

      angular.forEach(skills_obj, function(skill_obj, skill_id) {
        var skill_seniority_id;

        if (skill_obj.seniority.id) {
          skill_seniority_id = skill_obj.seniority.id;
        } else {
          skill_seniority_id = skill_obj.seniority;
        }

        if (skill_seniority_id === seniority_id &&
          answers_skills.indexOf(skill_id) === -1) {
          requires.push(skill_id);
        }
      });

      return {
        is: (requires.length === 0),
        requires: requires
      };
    }
  }
})();
