function HackerService($state, $mdToast, $firebase) {
    'use strict';

    var ref = new Firebase("https://hacker-assessor.firebaseio.com/hackers"),
        hackers = $firebase(ref);

    function showAlert(message) {
        var toast;

        if (!message) { message = 'Please fill in some data'; }

        toast = $mdToast.simple().content(message);

        $mdToast.show(toast).then(function success() {
            console.log('Toasted!');
            console.log(arguments);
        }, function error() {
            console.log('Fire! $mdToast failed.');
            console.error(arguments);
        });
    }

    return {
        getHacker: function getHacker(id) {
            var hacker = $firebase(ref.child(id));
            return hacker.$asObject().$loaded();
        },

        getHackers: function getHackers() {
            return hackers.$asObject().$loaded();
        },

        create: function create(hacker) {
            if (hacker.skills.length && hacker.name) {
                hackers.$push(hacker);
                $state.go('list');
            } else if (!hacker.name) {
                showAlert('Please add a name.');
            } else {
                showAlert();
            }
        },

        update: function update(hacker) {
            hacker.$save();
        }
    };
}

function SkillService(HelperService) {
    'use strict';

    return {
        skills: [],

        fetchSkills: function fetchSkills() {
            var options = {
                collection: this.skills,
                url: 'api/1/skills.json'
            };

            return HelperService.fetchData(options);
        }
    };
}

function CategoryService(HelperService) {
    'use strict';

    return {
        categories: [],

        fetchCategories: function fetchCategories() {
            var options = {
                collection: this.categories,
                url: 'api/1/categories.json'
            };

            return HelperService.fetchData(options);
        }
    };
}

function HelperService($http, $firebaseAuth, $state) {
    'use strict';

    return {
        fetchData: function fetchData(options) {
            options.cache = true;

            return $http.get(options.url)
                        .then(function (res) {

                    // Clever way to empty an Array.
                    options.collection.length = 0;

                    res.data.forEach(function (item) {
                        options.collection.push(item);
                    });

                    return options.collection;
                });
        },

        auth: function auth() {
            var ref = new Firebase('https://hacker-assessor.firebaseio.com/'),
                authObj = $firebaseAuth(ref);

            var offAuth = authObj.$onAuth(function(authData) {
                if (authData) {
                    console.log("Logged in as:", authData.uid);
                } else {
                    offAuth();
                    $state.go('home');
                    console.log("Logged out");
                }
            });

            return authObj;
        },

        login: function login() {
            this.auth().$authWithOAuthPopup("github")
                .then(function(authData) {
                    console.log("Logged in as:", authData.uid);
                    $state.go('list');
                }).catch(function(error) {
                    console.error("Authentication failed:", error);
                });
        },

        logout: function logout() {
            console.log('logout');
            this.auth().$unauth();
        }
    };
}

function QuestionService() {
    'use strict';

    return {

        assembleQuestions: function assembleQuestions(categories, skills, hacker) {
            var questions = [],
                counter;

            categories.forEach(function (category, index) {
                questions.push(category);

                questions[index].items = [];

                skills.forEach(function (skill) {
                    if (questions[index].id === skill.category_id) {

                        // Save array length state for future check.
                        counter = questions[index].items.length;

                        if (hacker && hacker.skills.length) {

                            hacker.skills.forEach(function (item) {
                                if (item.skill === skill.id) {
                                    questions[index].items.push({
                                        skill: skill,
                                        experience: item.experience
                                    });
                                }
                            });

                        }

                        // Checks array state and modify it if isn't changed.
                        if (counter === questions[index].items.length) {
                            questions[index].items.push({
                                skill: skill,
                                experience: { level: 0, years: 0 }
                            });
                        }
                    }
                });
            });

            return questions;
        },

        addSkill: function addSkill(states) {
            var newAnswer;

            if (states[0] !== states[1]) {
                newAnswer = {
                    skill: states[0].skill.id,
                    experience: states[0].experience
                };

                /*
                 * If hacker has skills, iterate through and compare
                 * against the new answer. If there is a match, remove
                 * the old answer.
                 */
                if (this.hacker.skills.length) {

                    this.hacker.skills.forEach(function (oldAnswer, index) {
                        if (oldAnswer.skill === newAnswer.skill) {
                            this.hacker.skills.splice(index, 1);
                        }
                    }, this);
                }

                this.hacker.skills.push(newAnswer);

            }
        }
    };
}
