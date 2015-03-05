function HackerService($firebase, $FirebaseObject, HelperService, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH + "hackers"),

        HackerMethods = $FirebaseObject.$extendFactory({
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

            save: function save() {
                this.$save().then(function success() {
                    HelperService.showAlert('Your changes have been saved.');
                });
            }
        }),

        HackersMethods = $FirebaseObject.$extendFactory({
            create: function create() {
                HelperService.dialogs.createHacker.show(this);
            }
        });

    return {
        hackers: null,

        getOne: function getOne(id) {
            var hacker = $firebase(ref.child(id), { objectFactory: HackerMethods });
            return hacker.$asObject().$loaded();
        },

        getAll: function getAll() {
            var hackers = $firebase(ref, { objectFactory: HackersMethods });

            function loaded(hackers){
                this.hackers = hackers;
                return this.hackers;
            }

            return hackers.$asObject()
                        .$loaded(loaded.call(this));
        }
    };
}

function SkillService($firebase, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH + "skills");

    return {
        skills: null,

        getAll: function getAll() {
            function loaded(skills) {
                this.skills = skills;
                return this.skills;
            }

            return $firebase(ref).$asObject()
                        .$loaded(loaded.call(this));
        }
    };
}

function CategoryService($firebase, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH + "categories");

    return {
        categories: null,

        getAll: function getAll() {
            function loaded(categories) {
                this.categories = categories;
                return this.categories;
            }

            return $firebase(ref).$asObject()
                        .$loaded(loaded.call(this));
        }
    };
}

function SeniorityService($firebase, BASE_PATH) {
    'use strict';

    var ref = new Firebase(BASE_PATH + "seniorities");

    return {
        seniorities: null,

        getAll: function getAll() {
            function loaded(seniorities) {
                this.seniorities = seniorities;
                return this.seniorities;
            }

            return $firebase(ref).$asObject()
                        .$loaded(loaded.call(this));
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
                        if (iKey === answer.skill) { iVal.experience = answer.experience };
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
