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
        },

        mergeSkills: function mergeSkills(categories, skills) {
            categories.forEach(function(category, i) {
                category.skills = [];

                skills.forEach(function(skill) {
                    if (skill.category_id === category.id) {
                        category.skills.push(skill);
                    }
                });
            });
        },

        destroyEmptyCategories: function destroyEmptyCategories(categories) {
            categories.forEach(function(category, index) {
                if (!category.skills.length) categories.splice(index, 1);
            });
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

                            /**
                             *  Clever way to empty an Array.
                             */
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