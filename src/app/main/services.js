function QuestionService(SkillService, HackerService) {

	return {
			loadQuestions: function loadQuestions(hacker) {

					return SkillService.getSkills()
							.then(function(skills) {
									var questions = [];

									skills.forEach(function(skill) {

											var question = {
													skill: skill,
													experience: {
															level: 1,
															years: 0
													},
													comment: null
											};

											if(hacker) {
													var hacker = HackerService.getHacker(hacker);
													hacker.answers.forEach(function(answer) {
															if (answer.skill === skill.id) {
																	question.experience = answer.experience;
																	question.comment = answer.comment;
															}
													});
											}

											questions.push(question);
									});

									return questions;
							})
			},
	};
}

function SkillService($http) {

	return {
			getSkills: function getSkills() {
					return $http.get('api/1/skills.json').then(function(response) {
							return response.data;
					});
			}
	};
}

function CategoryService($http) {

	return {
			getCategories: function getCategories() {
					return $http.get('api/1/categories.json').then(function(response) {
							return response.data;
					});
			}
	};
}

function HackerService() {
	// Write HackerService.

	return {

	};
}