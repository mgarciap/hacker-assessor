function ConfigFn($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
        url: '/',
        templateUrl: "main/partials/index.html",
        controller: "FormController as FormController",
        resolve: {
            categories: function categories(CategoryService) {
                return CategoryService.fetchCategories();
            },
        
            skills: function skills(SkillService) {
                return SkillService.fetchSkills();
            }
        }
    });
}

function FirstRun($rootScope){
    $rootScope.$on('$stateChangeError', function(){
        arguments[0].preventDefault();
        console.error(arguments[5]);
    });
}