function FormController($scope, CategoryService, SkillService) {

    function assembleFormCategories() {
        var categories = [];
        
        CategoryService.categories.forEach(function(category) {
            category.skills = [];

            SkillService.skills.forEach(function(skill) {
                if (skill.category_id === category.id) {
                    category.skills.push(skill);
                }
            });
            if (category.skills.length) categories.push(category);
        });

        return categories;
    }

    this.categories = assembleFormCategories();

}