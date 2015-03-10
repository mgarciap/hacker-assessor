function HackerService($firebaseObject, HelperService, SeniorityService, SkillService, $state, BASE_PATH) {
    'use strict';

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

            calculateSeniorities: function calculateSeniorities(skills, seniorities) {
                var seniors = {};

                angular.forEach(seniorities, function(val, key) {
                    seniors[key] = SeniorityService.is(this, key, skills);
                }, this);

                return seniors;
            },

            fetchSeniority: function fetchSeniority() {
                    function successActual(actualSeniority) {
                        this.seniority.actual = {
                            id: this.seniority.actual,
                            name: actualSeniority.name
                        };
                    }

                    function successNext(nextSeniority) {
                        this.seniority.next.name = nextSeniority.name;
                    }

                    SeniorityService.getOne(this.seniority.actual)
                        .then(successActual.bind(this));

                    SeniorityService.getOne(this.seniority.next.id)
                        .then(successNext.bind(this));
            },

            save: function save() {
                var skills,
                    seniorities,
                    calculated_seniorities;

                skills = SkillService.skills;
                seniorities = SeniorityService.seniorities;
                angular.forEach(this.answers, function(val, key) {
                    if (val.experience.level == 0 && val.experience.years == 0) {
                        delete this.answers[key];
                    }
                }, this);

                calculated_seniorities = this.calculateSeniorities(skills, seniorities);
                angular.forEach(calculated_seniorities, function(val, key) {
                    if (val.is) {
                        this.seniority.actual = key;
                    }
                    else {
                        this.seniority.next = {
                            id: key,
                            requires: val.requires
                        };
                    }
                }, this);

                this.$save().then(function success() {
                    HelperService.showAlert('Your changes have been saved.');
                    HelperService.dialogs.createHacker.hide();
                });
            }
        }),

        Hackers = $firebaseObject.$extend({
            $$updated: function(snap) {

                var changed = $firebaseObject.prototype.$$updated.apply(this, arguments);

                function fetchSeniorities(hackers) {
                    angular.forEach(hackers, function(val, key) {
                        var hacker_obj = new Hacker(ref.child(key));
                        hacker_obj.$loaded(function loaded(hacker) {
                            hacker.fetchSeniority();
                            hackers[key] = hacker;
                        });
                    });
                }

                fetchSeniorities(this);

                return changed;
            },

            create: function create(hackerTemplate) {
                var ref = this.$ref().push(hackerTemplate, function() {
                    HelperService.dialogs.createHacker.hide();
                    $state.go('edit', { id: ref.key() });
                });
            },

            destroy: function destroy(id) {
                $firebaseObject(this.$ref().child(id)).$remove();
            }
        });



    return {
        hackers: null,

        getOne: function getOne(id) {
            var hacker = new Hacker(ref.child(id));

            return hacker.$loaded();
        },

        getAll: function getAll() {
            var hackers = new Hackers(ref);

            function loaded(hackers){
                this.hackers = hackers;
                return this.hackers;
            }

            return hackers.$loaded(loaded.bind(this));
        },

        makeHackerTemplate: function makeHackerTemplate() {
            var hackerTemplate,
                requires = [],
                default_required_skills = SkillService.getBySeniority('-Jj_DTkfRMVNJl4qQq20');

            angular.forEach(default_required_skills, function(val, key) {
                requires.push(key);
            });

            hackerTemplate = {
                seniority: {
                    actual: '-JjzOnCYG8x6xGjdZYkh',
                    next: {
                        id: '-Jj_DTkfRMVNJl4qQq20',
                        requires: requires
                    }
                }
            };

            return hackerTemplate;
        }
    };
}

function SkillService($firebaseObject, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH + "skills");

    return {
        skills: null,

        getAll: function getAll() {
            function loaded(skills) {
                this.skills = skills;
                return this.skills;
            }

            return $firebaseObject(ref).$loaded(loaded.bind(this));
        },

        getBySeniority: function getBySeniority(id) {
            var skillsBySeniority = {};
            if (this.skills) {
                angular.forEach(this.skills, function (val, key) {
                    if (id === val.seniority) {
                        skillsBySeniority[key] = val;
                    }
                })
                return skillsBySeniority;
            }
        }
    };
}

function CategoryService($firebaseObject, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH + "categories");

    return {
        categories: null,

        getAll: function getAll() {
            function loaded(categories) {
                this.categories = categories;
                return this.categories;
            }

            return $firebaseObject(ref).$loaded(loaded.bind(this));
        }
    };
}

function SeniorityService($firebaseObject, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH + "seniorities");

    return {
        seniorities: null,

        getOne: function getOne(id) {
            return $firebaseObject(ref.child(id)).$loaded();
        },

        getAll: function getAll() {
            function loaded(seniorities) {
                this.seniorities = seniorities;
                return this.seniorities;
            }

            return $firebaseObject(ref).$loaded(loaded.bind(this));
        },

        /**
         * Tells if a hacker has a seniority and the skills that the hacker
         * requires for the seniority.
         *
         * @param  {Object}  hacker
         * @param  {String}  seniority_id  Firebase UID
         * @param  {Object}  all_skills    Firebase Collection
         * @return {Object}  {is: true/false, requires: [...]}
         */
        is: function is(hacker, seniority_id, all_skills) {
            var skills_needed = [],
                hacker_skills = [],
                does_not_have = [],
                index = 0;

            angular.forEach(hacker.answers, function(val, key) {
                hacker_skills.push(val.skill);
            });

            angular.forEach(all_skills, function(val, key) {
                if(val.seniority === seniority_id){
                    skills_needed.push(key);
                }
            });

            for (index; index < skills_needed.length; index++) {
                if(hacker_skills.indexOf(skills_needed[index]) < 0) {
                    does_not_have.push(skills_needed[index]);
                }
            }

            return {
                is: ( does_not_have.length === 0 ),
                requires: does_not_have
            };
        }
    };
}

function AuthService($firebaseAuth, $state, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH),
        authObj = $firebaseAuth(ref);

    return {
        auth: function auth() {
            return authObj;
        },

        login: function login() {
            authObj.$authWithOAuthPopup("github")
                .then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                    $state.go('list');
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                });
        },

        logout: function logout() {
            authObj.$unauth();
            console.log("Logged out");
            $state.go('home');
        }
    };
}

function QuestionService() {
    'use strict';

    function Questions() {}

    Questions.prototype.make = function make(categories, skills) {
        angular.forEach(categories, function(cVal, cKey) {
            var items;

            this[cKey] = { items: {}, name: cVal.name };

            angular.forEach(skills, function(sVal, sKey) {
                if (cKey === sVal.category) {
                    sVal.experience = { level: 0, years: 0 };
                    this[cKey].items[sKey] = sVal;
                }
            }, this);

            items = Object.keys.call(this, this[cKey].items);

            // Remove empty categories.
            if (items.length <= 0) { delete this[cKey] };
        }, this);

        return this;
    }

    Questions.prototype.addAnswers = function addAnswers(hacker) {
        angular.forEach(this, function (qVal, qKey) {
            angular.forEach(qVal.items, function(iVal, iKey) {
                if (hacker.answers) {
                    hacker.answers.forEach(function (answer) {
                        if (iKey === answer.skill) {
                            iVal.experience = answer.experience
                        };
                    });
                }
            });
        });
    }

    return { Questions: Questions };
}

function HelperService($document, $mdToast, $mdDialog) {
    return {
        showAlert: function showAlert(message) {
            $mdToast.show({
                parent: angular.element($document[0].body),
                template: "<md-toast>" + message + "</md-toast>"
            });
        },

        dialogs: {
            createHacker: {
                show: function show(hackers) {
                    $mdDialog.show({
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
    }
}
