angular.module('hackerAssessor.main', [])
    
    .controller('ListController', ListController)
    .controller('HackerController', HackerController)

    .factory('HackerService', HackerService)
    .factory('QuestionService', QuestionService)
    .factory('HelperService', HelperService)
    .factory('SkillService', SkillService)
    .factory('CategoryService', CategoryService);
