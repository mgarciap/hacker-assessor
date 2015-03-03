function HomeController(AuthService) {
    'use strict';

    this.login = function login() {
        AuthService.login();
    }
}

function HackersController(AuthService, $document, $mdDialog, hackers) {
    'use strict';

    this.hackers = hackers;

    this.logout = function logout() {
        AuthService.logout();
    }

    this.create = function create(hacker) {
        $mdDialog.show({
            parent: angular.element($document[0].body),
            templateUrl: 'main/partials/hacker-name-dialog.html',
            controller: 'HackerNameDialogController',
            controllerAs: 'HackerNameDialogController',
            resolve: {
              hackers: function () {
                  return hackers;
              }
            }
        });
    }
}

function HackerNameDialogController(HelperService, $mdDialog, hackers) {
    'use strict';

    this.hackers = hackers;

    this.hacker = {};

    this.confirm = function confirm() {
        if (this.hacker.name) {
            this.hackers.create(this.hacker);
            $mdDialog.hide();
        } else {
            HelperService.showAlert('Please, give a name to the new hacker!');
        }
    }

    this.cancel = function cancel() {
        $mdDialog.hide();
    }
}

function HackerController(QuestionService, hacker, hackers, categories, skills) {
    'use strict';

    this.hacker = hacker;

    this.create = function create() {
        hackers.create(this.hacker);
    };

    /**
     * Manually updated because it isn't possible to use $bindTo() without $scope.
     * For more details, please refer to the discussion linked below.
     * https://groups.google.com/d/topic/firebase-angular/zd0bV2brXtY/discussion
     */
    this.save = function save() {
        this.hacker.save();
    };

    this.questions = new QuestionService.Questions();
    this.questions.make(categories, skills);
    this.questions.addAnswers(this.hacker);
}
