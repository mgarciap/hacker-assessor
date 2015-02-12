function HackerService($q) {
    var hackers = [
        {
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
    ];

    return {
        getHacker: function getHacker(id) {
            id--;
            return $q(function(resolve, reject) {
                resolve(hackers[id]);
            });
        }
    };
}

function SkillService(HelperService) {
    var service = {
        skills: [],
        fetchSkills: function fetchSkills() {
            var options = {
                collection: service.skills,
                url: 'api/1/skills.json'
            };

            return HelperService.fetchData(options);
        }
    };

    return service;
}

function CategoryService(HelperService, SkillService) {
    var service = {
        categories: [],
        
        fetchCategories: function fetchCategories() {
            var options = {
                collection: service.categories,
                url: 'api/1/categories.json'
            };

            return HelperService.fetchData(options);
        }
    };

    return service;
}

function HelperService($http) {
    var service = {
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

    return service;
}

function QuestionService() {
    return {
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

                        } else {
                            console.error('You must pass a hacker argument!');
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