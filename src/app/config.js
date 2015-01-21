function ConfigFn($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      templateUrl: "hacker-assessor-legacy/partials/index.html", 
      controller: "AppController as AppController",
      resolve: {
        
        categories: function(DataService) {
          var options = {
                resource: 'categories',
                url: 'api/1/categories.json'
              };

          return DataService.query(options).then(function(data){
            return data;
          });

        },

        skills: function(DataService) {
          var options = {
                resource: 'skills',
                url: 'api/1/skills.json'
              };

          return DataService.query(options).then(function(data){
            return data;
          });
        }
      }
    })
}