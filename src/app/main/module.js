angular.module('hackerAssessor.main', [])
    .controller('FormController', FormController)
    .factory('HackerService', HackerService)
    .factory('QuestionService', QuestionService)
    .factory('HelperService', HelperService)
    .factory('SkillService', SkillService)
    .factory('CategoryService', CategoryService);