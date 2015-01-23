angular.module('main', [])

/////////////////
// CONTROLLERS //
/////////////////
.controller('FormController', FormController)


//////////////
// SERVICES //
//////////////
.factory('SkillService', SkillService)
.factory('CategoryService', CategoryService)
.factory('QuestionService', QuestionService);