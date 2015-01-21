angular.module('hacker-assessor-legacy', ['ui.router', 'ui.bootstrap'])

/////////////////
// CONTROLLERS //
/////////////////
.controller('AppController', AppController)


//////////////
// SERVICES //
//////////////
.factory('DataService', DataService)
.factory('AnswerFormService', AnswerFormService)
.factory('SearchService', SearchService);
