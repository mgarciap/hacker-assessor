function ConfigFn($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('index', {
			url: '/',
			templateUrl: 'common/partials/index.html',
			controller: 'CommonController as CommonController'
		})
		.state('module1', {
			url: '/module1/index',
			templateUrl: 'module1/partials/index.html',
			controller: 'Module1Controller as Module1Controller',
			controllerAs: 'module1',
			resolve: Module1Controller.resolve
		})
	;
}
