function HomeController(AuthService) {
    'use strict';

    this.login = function login() {
        AuthService.login();
    };
}

function HackersController(AuthService, HelperService, hackers) {
    'use strict';

    this.hackers = hackers;

    this.destroy = function destroy(id) {
        this.hackers.destroy(id);
    };

    this.logout = function logout() {
        AuthService.logout();
    };

    this.create = function create() {
        HelperService.dialogs.createHacker.show(hackers);
    };
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

function HackerNameDialogController(HelperService, HackerService, hackers) {
    'use strict';

    this.hackerTemplate = HackerService.makeHackerTemplate();

    this.confirm = function confirm() {
        if (this.hackerTemplate.name) {
            hackers.create(this.hackerTemplate);
        } else {
            HelperService.showAlert('Please, give a name to the new hacker!');
        }
    }

    this.cancel = function cancel() {
        HelperService.dialogs.createHacker.hide();
    }
}
