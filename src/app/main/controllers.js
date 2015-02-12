function ListController(hackers) {
    this.hackers = hackers;
}

function UpdateController(QuestionService, hacker, categories, skills) {
    this.hacker = hacker;

    this.questions = QuestionService.assembleQuestions(categories, skills, this.hacker);

    this.addSkill = QuestionService.addSkill;
}

function CreateController(categories, skills, HackerService, QuestionService) {
    this.hacker = { name: null, skills: [] };

    this.questions = QuestionService.assembleQuestions(categories, skills);

    this.addSkill = QuestionService.addSkill;

    this.save = function save() {
        HackerService.create(this.hacker);
    };
}