function SkillService($http) {
    var service = {
        skills: [],
        fetchSkills: function fetchSkills() {
            return $http.get('api/1/skills.json')
                        .then(function(res) {
                            res.data.forEach(function(item) {
                                service.skills.push(item);
                            });
                        });
        }
    };

    return service;
}

function CategoryService($http) {
    var service = {
        categories: [],
        fetchCategories: function fetchCategories() {
            return $http.get('api/1/categories.json')
                        .then(function(res) {
                            res.data.forEach(function(item) {
                                service.categories.push(item);
                            });
                        });
        }
    };

    return service;
}