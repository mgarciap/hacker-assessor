function FormController(HelperService,categories,skills) {

    this.categories = HelperService.assembleFormCategories(categories, skills);

}