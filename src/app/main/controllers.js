function ListController(hackers) {
    'use strict';

    this.hackers = hackers;
}

function HackerController($state, QuestionService, HackerService, hacker, categories, skills) {
    'use strict';

    this.hacker = hacker;

    this.isCreate = $state.is('create');

    this.questions = QuestionService.assembleQuestions(categories, skills, this.hacker);

    this.addSkill = QuestionService.addSkill;

    this.save = function save() {
        HackerService.create(this.hacker);
    };

    /**
     * Manually updated because it isn't possible to use $bindTo() without $scope.
     * For more details, please refer to the discussion linked below.
     * https://groups.google.com/d/topic/firebase-angular/zd0bV2brXtY/discussion
     */
    this.update = function update() {
        HackerService.update(this.hacker);
    };
}
