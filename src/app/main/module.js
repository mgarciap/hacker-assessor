angular.module('hackerAssessor.main', [])
  .controller('FormController', FormController)
  .factory('SkillService', SkillService)
  .factory('HackerService', HackerService)
  .factory('CategoryService', CategoryService)
  .factory('QuestionService', QuestionService);