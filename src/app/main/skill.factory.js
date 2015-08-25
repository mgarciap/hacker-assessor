(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .factory('SkillService', SkillService);

  SkillService.$inject = ['$firebaseObject', 'SeniorityService', 'BASE_PATH'];

  function SkillService($firebaseObject, SeniorityService, BASE_PATH) {
    var ref = new Firebase(BASE_PATH + "skills"),

      Skills = $firebaseObject.$extend({
        fetchSeniorities: function fetchSeniorities() {
          angular.forEach(this, function(val, key) {
            function success(seniority) {
              var id = this[key].seniority;

              this[key].seniority = {
                id: id,
                name: seniority.name
              };
            }

            SeniorityService.getOne(val.seniority).then(success.bind(this));
          }, this);

          return this;
        }
      });

    var service = {
      skills: null,

      getAll: function getAll() {
        var skills = new Skills(ref);

        function loaded(skills) {
          this.skills = skills;
          return this.skills;
        }

        return skills.$loaded(loaded.bind(this));
      },

      getBySeniority: function getBySeniority(id) {
        var skillsBySeniority = {};
        if (this.skills) {
          angular.forEach(this.skills, function(val, key) {
            var seniority_id;

            if (val.seniority.id) {
              seniority_id = val.seniority.id;
            } else {
              seniority_id = val.seniority;
            }

            if (id === seniority_id) {
              skillsBySeniority[key] = val;
            }
          });
          return skillsBySeniority;
        }
      }
    };

    return service;
  }
})();
