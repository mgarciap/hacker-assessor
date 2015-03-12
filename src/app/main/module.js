angular.module('hackerAssessor.main', [

        'ui.router',
        'ngAnimate',
        'firebase',
        'ngMaterial'

])
    .constant('BASE_PATH', 'https://hacker-assessor.firebaseio.com/')
    .constant('TEMPLATE_SENIORITIES', { CURRENT: { ID: '-Jk8wy2M_BfCZXtagqKC' }, NEXT: { ID: '-Jj_DTkfRMVNJl4qQq20' } })
    .constant('MAX_SENIORITY_ID', "-Jj_DBAikma6ZDJmAUMe")


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
