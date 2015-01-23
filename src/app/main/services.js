'use strict';

function QuestionService(SkillService, HackerService) {

	return {
		loadQuestions: function loadQuestions(hacker) {
			var questions = [],
					skills = SkillService.getSkills(),
					hacker = HackerService.getHacker(hacker);

			skills.forEach(function(skill) {
				
				var question = {
					skill: skill,
					experience: { level: 1, years: 0 },
					comment: null
				};

				if(hacker) {
					hacker.answers.forEach(function(answer) {
						if (answer.skill === skill.id) {
							question.experience = answer.experience;
							question.comment = answer.comment;
						}
					});
				}

				questions.push(question);
			})
			
			return questions
		},
	};
}

function SkillService($http) {
	
	return {
		getSkills: function getSkills() {
			$http({url: 'api/1/skills.json'}).success(function (data){
				return data;
			});
		}
	}
}

function CategoryService($http) {

	return {
		getCategories: function getCategories() {
			$http({url: 'api/1/categories.json'}).success(function (data){
				return data;
			});
		}
	}
}