function DataService($http, $q) {
	var answers = [];

	return {

		// options: {
		//   resurce: String,
		//   url: String
		// }
		query: function(options) {
			var cache = JSON.parse(localStorage.getItem(options.resource)),
				deferred = $q.defer();

			if (cache) {
				deferred.resolve(cache);
				return deferred.promise;
			} else {
				return $http({
					url: options.url
				}).then(function(response) {
					cache = response.data;
					localStorage.setItem(options.resource, JSON.stringify(cache));
					return cache;
				});
			}
		}

	};
}

function AnswerFormService() {
	var unloadAnswer = function(answer) {
			answer.data = {
				skill_name: undefined,
				skill_id: undefined,
				experience: {
					level: 1,
					years: 0
				},
				comment: undefined
			};
		},

		loadAnswer = function(answers, skill) {
			var local_storage = JSON.parse(localStorage.getItem('answers')),

				answers = local_storage || answers,

				_answer = {
					skill_id: skill.id,
					skill_name: skill.name,
					experience: {
						level: 1,
						years: 0
					},
					comment: undefined
				};

			answers.forEach(function(answer) {
				if (answer.skill_id == skill.id) {
					_answer = answer;
					return;
				}
			});

			return _answer;
		};

	return {
		loadForm: function(answer, answers, skill) {
			answer.data = loadAnswer(answers, skill);
			answer.form.config.visible = true;
		},

		unloadForm: function(answer) {
			unloadAnswer(answer);
			answer.form.config.visible = false;
		},

		saveAnswer: function(answers, answer) {
			answers.forEach(function(_answer, index) {
				if (_answer.skill_id === answer.skill_id) {
					answers.splice(index);
				}

			});
			answer.experience.level = parseInt(answer.experience.level);
			answers.push(angular.copy(answer));
			localStorage.setItem('answers', JSON.stringify(answers));
		}
	}
}

function SearchService() {
	return {
		updateExpandedCategories: function(search_term, skills, categories) {
			var search_expression,
				matched_skills = [];

			if (search_term.length) {
				search_expression = new RegExp(search_term, 'i');
				matched_skills = skills.filter(function(skill) {
					return skill.name.match(search_expression);
				});
			}

			categories.forEach(function(category) {
				category.expanded = false;
				matched_skills.forEach(function(skill) {
					if (skill.category_id == category.id) {
						category.expanded = true;
					}
				});
			});
		},

		assembleCategory: function(skills, categories, category, search_term) {
			var search_expression = new RegExp(search_term, 'i');

			var category_skills = skills.filter(function(skill) {
				return skill.category_id === category.id;
			});

			var searched_skills = category_skills.filter(function(skill) {
				return skill.name.match(search_expression);
			});

			var matched_category = category.name.match(search_expression);

			return matched_category === [''] || searched_skills.length > 0;
		}
	}
}