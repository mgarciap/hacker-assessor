function ConfigFn($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
        url: '/',
        templateUrl: "main/partials/index.html",
        controller: "FormController as FormController",
        resolve: {
            categories: function categories($q,CategoryService,SkillService) {
                var fetchSkills = SkillService.fetchSkills(),
                    fetchCategories = CategoryService.fetchCategories();

                return $q.all([fetchSkills,fetchCategories])
                            .then(function (settled) {
                                var skills = settled[0],
                                    categories = settled[1];
                                
                                CategoryService.mergeSkills(categories,skills);
                                CategoryService.destroyEmptyCategories(categories);
                                return categories;
                            });
            }
        }
    });
}

function runnable($rootScope){
    /**
     * Pelase refer to the official documentation for more
     * on the argument list passed to the callback.
     *
     * https://github.com/angular-ui/ui-router/wiki#state-change-events
     */
    
    $rootScope.$on('$stateChangeError', function(){
        arguments[0].preventDefault();
        console.error(arguments[5]);
    });
}