(function() {
  'use strict';

  angular
    .module('hackerAssessor')
    .factory('HackerService', HackerService);

  HackerService.$inject = ['$firebaseObject', '$q', '$state', 'HelperService', 'SeniorityService', 'SkillService', 'BASE_PATH', 'TEMPLATE_SENIORITIES', 'MAX_SENIORITY_ID'];

  function HackerService($firebaseObject, $q, $state, HelperService, SeniorityService, SkillService, BASE_PATH, TEMPLATE_SENIORITIES, MAX_SENIORITY_ID) {

    var ref = new Firebase(BASE_PATH + "hackers"),

      Hacker = $firebaseObject.$extend({
        addSkill: function addSkill(states, id) {
          var newAnswer;
          if (states[0] !== states[1]) {
            newAnswer = {
              skill: id,
              experience: states[0].experience
            };

            /**
             * If hacker has skills, iterate through and compare
             * against the new answer. If there is a match, remove
             * the old answer.
             */
            if (this.answers) {
              this.answers.forEach(function(oldAnswer, index) {
                if (oldAnswer.skill === newAnswer.skill) {
                  this.answers.splice(index, 1);
                }
              }, this);
            } else {
              this.answers = [];
            }

            this.answers.push(newAnswer);
          }
        },

        /**
         * Checks if hacker has any ore some seniority.
         *
         * @param  {Object.<string, object>} skills              A Firebase skills reference synced as object.
         * @param  {Object.<string, object>} seniorities         A Firebase seniorities reference synced object.
         * @return {Object.<string, object>} checked_seniorities
         */
        checkSeniorities: function checkSeniorities(skills_obj, seniorities_obj) {
          var checked_seniorities = {};

          angular.forEach(seniorities_obj, function(seniority_obj, seniority_id) {
            checked_seniorities[seniority_id] = SeniorityService.is(this.answers, seniority_id, skills_obj);
          }, this);

          return checked_seniorities;
        },

        fetchSeniority: function fetchSeniority() {

          var current = null,
            next = null;

          current = SeniorityService.getOne(this.seniority.current.id);

          if (this.seniority.next) {
            next = SeniorityService.getOne(this.seniority.next.id);
          }

          function success(settled) {
            var current_seniority = settled[0],
              next_seniority = settled[1];

            this.seniority.current = {
              id: this.seniority.current,
              name: current_seniority.name
            };

            if (this.seniority.next) {
              this.seniority.next.name = next_seniority.name;
            }
          }

          return $q.all([current, next]).then(success.bind(this));
        },

        save: function save() {
          var skills,
            seniorities,
            checked_seniorities;

          skills = SkillService.skills;
          seniorities = SeniorityService.seniorities;
          angular.forEach(this.answers, function(val, key) {
            if (val.experience.level === 0 && val.experience.years === 0) {
              delete this.answers[key];
            }
          }, this);

          checked_seniorities = this.checkSeniorities(skills, seniorities);
          var current_set = false,
            next_set = false;

          angular.forEach(checked_seniorities, function(checked_obj, seniority_id) {
            if (!current_set || !next_set) {
              if (checked_obj.is) {
                this.seniority.current.id = seniority_id;
                current_set = true;
              } else {
                this.seniority.next = {
                  id: seniority_id,
                  requires: checked_obj.requires
                };
                next_set = true;
              }
            }

            if (this.seniority.current.id === MAX_SENIORITY_ID) {
              this.seniority.next = null;
            }
          }, this);

          function fetched() {
            return this.fetchSeniority();
          }

          function alertSaved() {
            return HelperService.alert.show('Your changes have been saved.');
          }

          function alertCurrent() {
            return HelperService.alert.show('This hacker is at a ' + this.seniority.current.name + ' level.');
          }

          function alertNext() {
            if (this.seniority.next) {
              HelperService.alert.show('His next step is the ' + this.seniority.next.name + ' level.');
            }
          }

          this.$save().then(fetched.bind(this))
            .finally(alertSaved) // Notice that alertSaved doesn't require to passed with bind.
            .finally(alertCurrent.bind(this))
            .finally(alertNext.bind(this));
        }
      }),

      Hackers = $firebaseObject.$extend({
        $$updated: function(snap) {

          var changed = $firebaseObject.prototype.$$updated.apply(this, arguments);

          function fetchSeniorities(hackers) {
            angular.forEach(hackers, function(val, key) {
              var hacker = new Hacker(ref.child(key));
              hacker.$loaded(function loaded(hacker_obj) {
                hacker_obj.fetchSeniority();
                hackers[key] = hacker_obj;
              });
            });
          }

          fetchSeniorities(this);

          return changed;
        },

        create: function create(hackerTemplate) {
          var ref = this.$ref().push(hackerTemplate, function() {
            HelperService.dialogs.createHacker.hide();
            $state.go('edit', {
              id: ref.key()
            });
          });
        },

        destroy: function destroy(id) {
          $firebaseObject(this.$ref().child(id)).$remove();
        }
      });

    var service = {
      hackers: null,

      getOne: function getOne(id) {
        var hacker = new Hacker(ref.child(id));

        return hacker.$loaded();
      },

      getAll: function getAll() {
        var hackers = new Hackers(ref);

        function loaded(hackers) {
          this.hackers = hackers;
          return this.hackers;
        }

        return hackers.$loaded(loaded.bind(this));
      },

      makeHackerTemplate: function makeHackerTemplate() {
        var hackerTemplate,
          requires = [],
          default_required_skills = SkillService.getBySeniority(TEMPLATE_SENIORITIES.NEXT.ID);

        angular.forEach(default_required_skills, function(skill_obj, skill_id) {
          requires.push(skill_id);
        });

        hackerTemplate = {
          seniority: {
            current: {
              id: TEMPLATE_SENIORITIES.CURRENT.ID
            },
            next: {
              id: TEMPLATE_SENIORITIES.NEXT.ID,
              requires: requires
            }
          }
        };

        return hackerTemplate;
      }
    };

    return service;
  }
})();
