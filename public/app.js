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
            return CategoryService.query().then(function(response){
              console.log('resolve')
              return response;
            });
          },
          skills: function(DataLoaderService) {
            return DataLoaderService.get('api/1/skills.json');
          }
        }
      })
  })
  .controller('AppCtrl', function ($scope, categories, skills, SearchService, AnswerFormService) {  
    $scope.categories = categories.data;   
    $scope.skills = skills.data;
    $scope.answer = { experience: { level: 1, years: 0 }, comment: '' };
    $scope.assembleCategory = SearchService.assembleCategory;
    $scope.updateExpandedCategories = SearchService.updateExpandedCategories;
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
        if(cache){
          var deferred = $q.defer();
          deferred.resolve(cache);
          return deferred.promise;
        }
        else{
          return DataLoaderService.get('api/1/categories.json').then(function(response){
              console.log('query')
            cache = response;
            localStorage.setItem('cache', JSON.stringify(cache));
            return response;
          });
        }
      }
    };
  })
  .factory('AnswerFormService', function(){
    return {
      loadPreviousAnswer: function(skill_id) {
        var answers = JSON.parse(localStorage.getItem('skills')) || [];
        answers.forEach(function(answer) {
          return answer.skill_id == skill_id ? answer :  $scope.answer;
        })
      },

      loadForm: function(skillID,skillName) {
        var answer = loadPreviousAnswer(skillID);
        $scope.experience.level = answer.experience_level;
        $scope.experience.years = answer.experience_years;
        $scope.comment = answer.comentario;
        $scope.isVisible = true;
      },

      closeForm: function() {
        $scope.answer = { experience: { level: 1, years: 0 }, comment: '' };
      },

      saveExperience: function() {
        $scope.answers.forEach(function(currentValue,index,array) {
          if (currentValue.skill_id === answer.skill_id) {
            array.splice(index);
          }
        });

        $scope.answers.push(answer);
        localStorage.setItem('skills', JSON.stringify($scope.answers));
      }
    }
  })
  .factory('SearchService', function(){
    return {
      updateExpandedCategories: function(search_term, skills, categories){
        var search_expression;

        if (search_term.length === 0) {
          search_expression = /''/;
        } else {
          search_expression = new RegExp(search_term, 'i');
        }

        var matched_skills = skills.filter(function(skill) {
            return skill.name.match(match_expression);
        });

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

        if (matched_category <= 0) {
          return false;
        } else {
          return !matched_category || searched_skills.length > 0; 
        }
      }
    }
  })