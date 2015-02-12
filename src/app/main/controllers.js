function FormController(QuestionService, hacker, categories, skills) {
    this.hacker = hacker;

    this.questions = QuestionService.assembleQuestions(categories, skills, this.hacker);

    this.addSkill = QuestionService.addSkill;
}