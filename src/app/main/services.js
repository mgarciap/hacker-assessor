function HackerService($firebaseObject, $q, $state, HelperService, SeniorityService, SkillService, BASE_PATH, TEMPLATE_SENIORITIES, MAX_SENIORITY_ID) {
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

                return $q.all([current,next]).then(success.bind(this));
            },

            save: function save() {
                var skills,
                    seniorities,
                    checked_seniorities;

                skills = SkillService.skills;
                seniorities = SeniorityService.seniorities;
                angular.forEach(this.answers, function(val, key) {
                    if (val.experience.level == 0 && val.experience.years == 0) {
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

                    if(this.seniority.current.id === MAX_SENIORITY_ID) {
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
}

function SkillService($firebaseObject, SeniorityService, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH + "skills"),

        Skills = $firebaseObject.$extend({
            fetchSeniorities: function fetchSeniorities() {
                angular.forEach(this, function(val, key) {
                    function success(seniority) {
                        this[key].seniority = seniority;
                    }

                    SeniorityService.getOne(val.seniority).then(success.bind(this));
                }, this);

                return this;
            }
        });

    return {
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
         * @param  {Object}  answers       A Firebase hacker reference synced as an object.
         * @param  {Object}  skills_obj       A Firebase skills reference synced as an object.
         * @param  {String}  seniority_id     A Firebase seniority child reference key.
         * @return {Object.<boolean, object>}
         */
        is: function is(answers, seniority_id, skills_obj) {
            var answers = answers || [],
                is = null,
                requires = [],
                answers_skills = [];

            answers.forEach(function(answer, index) {
                answers_skills.push(answer.skill);
            });

            angular.forEach(skills_obj, function(obj, id) {
                var A = obj.seniority === seniority_id,
                    B = answers_skills.indexOf(id) === -1;

                if(A && B) { requires.push(id) };
            });

            is = requires.length === 0;

            return {
                is: is,
                requires: requires
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
                .then(function success(authData) {
                    $state.go('list');
                });
        },

        logout: function logout() {
            authObj.$unauth();
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
    }
}
