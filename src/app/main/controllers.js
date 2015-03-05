function HomeController(AuthService) {
    'use strict';

    this.login = function login() {
        AuthService.login();
    }
}

function HackersController(AuthService, HelperService, hackers, HackerService) {
    'use strict';

    this.hackers = hackers;

    this.destroy = function destroy(id) {
        HackerService.getOne(id)
            .then(function success(hacker) {
                hacker.$remove();
            });
    }

    this.logout = function logout() {
        AuthService.logout();
    }

    this.create = function create() {
        this.hackers.create();
    }
}

function HackerController(QuestionService, hacker, categories, skills) {
    'use strict';

    this.hacker = hacker;

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

function HackerNameDialogController(HelperService, $state, hackers) {
    'use strict';

    this.hacker = {};

    this.confirm = function confirm() {
        if (this.hacker.name) {
            hackers.$inst().$push(this.hacker)
                .then(function success(ref) {
                    HelperService.dialogs.createHacker.hide();
                    $state.go('edit', { id: ref.key() });
                });
        } else {
            HelperService.showAlert('Please, give a name to the new hacker!');
        }
    }

    this.cancel = function cancel() {
        HelperService.dialogs.createHacker.hide();
    }
}
