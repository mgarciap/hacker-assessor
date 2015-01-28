function SkillService(HelperService) {
    var service = {
        skills: [],
        fetchSkills: function fetchSkills() {
            var options = {
                model: service.skills,
                url: 'api/1/skills.json'
            };

            return HelperService.fetchData(options);
        }
    };

    return service;
}

function CategoryService(HelperService) {
    var service = {
        categories: [],
        fetchCategories: function fetchCategories() {
            var options = {
                model: service.categories,
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
            return $http.get(options.url)
                        .then(function(res) {
                            options.model.length = 0;
                    
                            res.data.forEach(function(item) {
                                options.model.push(item);
                            });
                    
                            return options.model;
                        });
        },
        
        assembleFormCategories: function assembleFormCategories(categories, skills) {
            var _categories = [];
            
            categories.forEach(function(category) {
                category.skills = [];

                skills.forEach(function(skill) {
                    if (skill.category_id === category.id) {
                        category.skills.push(skill);
                    }
                });
                if (category.skills.length) _categories.push(category);
            });

            return _categories;
        }

    };

    return service;
}