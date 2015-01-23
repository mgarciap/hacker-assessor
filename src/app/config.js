function ConfigFn($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: "main/partials/index.html", 
      controller: "FormController",
      resolve: {
        categories: function categories(CategoryService) {
          return CategoryService.getCategories();
        },

        questions: function questions(QuestionService) {
          return QuestionService.loadQuestions();
        }
      }
    });
}

function FirstRun($rootScope){

  $rootScope.$on('$stateChangeError', function(){
    attributes[0].preventDefault();
    console.error(attributes[5]); 
  });

}