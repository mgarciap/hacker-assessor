"use strict";

angular.module('hacker-assessor',['ui.bootstrap', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "/main.html", 
        controller: "AppCtrl",
        controllerAs: 'controller',
        resolve: {
          categories: function(CategoryService, $q) {
            return CategoryService.query().then(function(data){
              return data;
            });
          },
          skills: function(DataLoaderService) {
            return DataLoaderService.get('api/1/skills.json');
          }
        }
      })
  })
  .controller('AppCtrl', function ($scope, categories, skills, SearchService, AnswerFormService) {  
    $scope.categories = categories;   
    $scope.skills = skills.data;
    $scope.answers = [];

    $scope.answer = {
      form: {
        config: {
          visible: false
        }
      },
      data: {
        skill_name: undefined,
        skill_id: undefined,
        experience: { 
          level: 1, 
          years: 0 
        },
        comment: undefined
      }
    };

    $scope.assembleCategory = SearchService.assembleCategory;
    $scope.updateExpandedCategories = SearchService.updateExpandedCategories;
    $scope.loadForm = AnswerFormService.loadForm;
    $scope.unloadForm = AnswerFormService.unloadForm;
    $scope.saveAnswer = AnswerFormService.saveAnswer; 
 
  })
  .service('DataLoaderService', function($http) { 
    this.get = function(url) {
      return $http({ url: url });
    }
  })
  .factory('CategoryService', function($q, DataLoaderService){
    
    var cache = JSON.parse(localStorage.getItem('cache'));
    
    return {
      query: function (){
        if (cache) {

          var deferred = $q.defer();
          deferred.resolve(cache);
          return deferred.promise;

        } else {

          return DataLoaderService.get('api/1/categories.json').then(function(response){
            cache = response.data;
            localStorage.setItem('cache', JSON.stringify(cache));
            return response;

          });
        }
      }
    };
  })
  .factory('AnswerFormService', function(){

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
    };

    var loadAnswer = function(answers, skill) {
      var answers = JSON.parse(localStorage.getItem('answers')) || answers;
      var _answer = {
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
        answers.forEach(function(_answer,index) {          
          if (_answer.skill_id === answer.skill_id) {
            answers.splice(index);
          }

        });
        answer.experience.level = parseInt(answer.experience.level);
        answers.push(angular.copy(answer));
        localStorage.setItem('answers', JSON.stringify(answers));
      }
    }
  })
  .factory('SearchService', function(){
    return {
      updateExpandedCategories: function(search_term, skills, categories){
        var search_expression,
            matched_skills = [];

        if (search_term.length){
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
      assembleCategory: function(skills, categories, category, search_term){
        var search_expression = new RegExp(search_term, 'i');
        
        var category_skills = skills.filter(function(skill){
          return skill.category_id === category.id;
        });
        
        var searched_skills = category_skills.filter(function(skill){
          return skill.name.match(search_expression);
        });
        
        var matched_category = category.name.match(search_expression);

        return matched_category === [''] || searched_skills.length > 0;
      }
    }
  })