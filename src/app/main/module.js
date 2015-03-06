angular.module('hackerAssessor.main', [

        'ui.router',
        'ngAnimate',
        'firebase',
        'ngMaterial'

    ]).constant('BASE_PATH', 'https://hacker-assessor.firebaseio.com/')

    .controller('HomeController', HomeController)
    .controller('HackersController', HackersController)
    .controller('HackerController', HackerController)
    .controller('HackerNameDialogController', HackerNameDialogController)

    .factory('SeniorityService', SeniorityService)
    .factory('SkillService', SkillService)
    .factory('CategoryService', CategoryService)
    .factory('HackerService', HackerService)
    .factory('QuestionService', QuestionService)
    .factory('AuthService', AuthService)
    .factory('HelperService', HelperService);
