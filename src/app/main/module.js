angular.module('hackerAssessor.main', [])

    .controller('HomeController', HomeController)
    .controller('HackerListController', HackerListController)
    .controller('HackerController', HackerController)

    .factory('HackerService', HackerService)
    .factory('QuestionService', QuestionService)
    .factory('HelperService', HelperService)
    .factory('SkillService', SkillService)
    .factory('CategoryService', CategoryService);
