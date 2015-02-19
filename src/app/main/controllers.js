function ListController(hackers) {
    'use strict';

    this.hackers = hackers;
}

function UpdateController(QuestionService, HackerService, hacker, categories, skills) {
    'use strict';

    this.hacker = hacker;

    this.questions = QuestionService.assembleQuestions(categories, skills, this.hacker);

    this.addSkill = QuestionService.addSkill;
    /**
     * Manually updated because it isn't possible to use $bindTo() without $scope.
     * For more details, please refer to the discussion linked below.
     * https://groups.google.com/d/topic/firebase-angular/zd0bV2brXtY/discussion
     */
    this.update = function update() {
        HackerService.update(this.hacker);
    };
}

function CreateController(categories, skills, HackerService, QuestionService) {
    'use strict';

    this.hacker = { name: null, skills: [] };

    this.questions = QuestionService.assembleQuestions(categories, skills);

    this.addSkill = QuestionService.addSkill;

    this.save = function save() {
        HackerService.create(this.hacker);
    };
}
