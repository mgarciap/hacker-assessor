function HackerService($q, $state, $mdToast) {
    var hackers = {
        1: {
            name: 'Ryan Dahl',
            skills: [
                {
                    skill: 1,
                    experience: {
                        level: 2,
                        years: 4
                    }
                },
                {
                    skill: 2,
                    experience: {
                        level: 3,
                        years: 2
                    }
                }
            ]
        }
    };

    function showAlert(message) {
        var toast;

        if (!message) message = 'Please fill in some data';

        toast = $mdToast.simple().content(message);

        $mdToast.show(toast)
            .then(function() {
                console.log('Toasted!');
                console.log(arguments);
            }, function() {
                console.log('Fire! $mdToast failed.');
                console.error(arguments);
            });
    }
    
    /*
     * Returns a random integer between min (included) and max (excluded)
     * Using Math.round() will give you a non-uniform distribution!
     */
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    return {
        getHacker: function getHacker(id) {
            return $q(function(resolve, reject) {
                resolve(hackers[id]);
            });
        },
        getHackers: function getHackers() {
            return $q(function(resolve, reject) {
                resolve(hackers);
            });
        },
        create: function create(hacker) {
            var uid = getRandomInt(0, 1000);

            if (hacker.skills.length && hacker.name) {
                hackers[uid] = hacker;
                $state.go('list');
            } else if (!hacker.name) {
                showAlert('Please add a name.');
            } else {
                showAlert();
            }
        }
    };
}

function SkillService(HelperService) {
    return  {
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

function CategoryService(HelperService, SkillService) {
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

function HelperService($http) {
    return {
        fetchData: function fetchData(options) {
            options.cache = true;

            return $http.get(options.url)
                        .then(function(res) {

                            // Clever way to empty an Array.
                            options.collection.length = 0;

                            res.data.forEach(function(item) {
                                options.collection.push(item);
                            });
                    
                            return options.collection;
                        });
        }
    };
}

function QuestionService() {
    return {
        
        /**
         * [assembleQuestions description]
         * @param  {[type]} categories [description]
         * @param  {[type]} skills     [description]
         * @param  {[type]} hacker     [description]
         * @return {[type]}            [description]
         */
        assembleQuestions: function assembleQuestions(categories, skills, hacker) {
            var questions = [],
                counter;

            categories.forEach(function(category, index) {
                questions.push(category);

                questions[index].items = [];

                skills.forEach(function(skill) {
                    if (questions[index].id === skill.category_id) {

                        // Save array length state for future check.
                        counter = questions[index].items.length;
                        
                        if (hacker && hacker.skills.length) {
                            
                            hacker.skills.forEach(function(item) {
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

                    this.hacker.skills.forEach(function(oldAnswer, index) {
                        if (oldAnswer.skill === newAnswer.skill){
                            this.hacker.skills.splice(index, 1);
                        }
                    }, this);
                }

                this.hacker.skills.push(newAnswer);

            }
        }
    };
}