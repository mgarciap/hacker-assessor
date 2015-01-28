angular.module('hackerAssessor.main', [])
  .controller('FormController', FormController)
  .factory('HelperService', HelperService)
  .factory('SkillService', SkillService)
  .factory('CategoryService', CategoryService);