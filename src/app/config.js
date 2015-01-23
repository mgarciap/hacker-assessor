function ConfigFn($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: "main/partials/index.html", 
      controller: "FormController as FormController",
      resolve: {
        categories: function(CategoryService) {
          return CategoryService.getCategories();
        },

        questions: function(QuestionService) {
          return QuestionService.loadQuestions();
        }
      }
    })
}