function ConfigFn($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: "main/partials/index.html",
      controller: "FormController as FormController",
      resolve: {
        init: function init($q, CategoryService, SkillService) {
          var skillPromise = SkillService.fetchSkills(),
              categoryPromise = CategoryService.fetchCategories();
          
          return $q.all([skillPromise, categoryPromise]);
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