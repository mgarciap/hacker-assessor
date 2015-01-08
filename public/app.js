angular.module('catalogo',['ui.bootstrap', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller: CatalogoCtrl,
        
      })
  })
  .controller('CatalogoCtrl', function ($scope,$http) {
    
    $http.get('api/1/categories.json').success(function(data){
      $scope.categories = data;
    });    
    
    $http.get('api/1/skills.json').success(function(data){
      $scope.skills = data;
    });    

    $scope.isVisible = false;
    $scope.skillName;
    $scope.skillID;
    $scope.answers = [];

    $scope.loadPreviousAnswer = function(skillID) {
      var storage = JSON.parse(localStorage.getItem('skills')) || [];
      var answer;
      storage.forEach(function(item) {
        if (item.skill_id == skillID) {
          answer = item;
        } 
      })

      return answer || {};
    }

    $scope.loadForm = function(skillID,skillName) {
      var answer = loadPreviousAnswer(skillID);
      $scope.experience.level = answer.experience_level;
      $scope.experience.years = answer.experience_years;
      $scope.comment = answer.comentario;
      $scope.skillName = skillName;
      $scope.skillID = skillID;
      $scope.isVisible = true;
    }

    $scope.closeForm = function() {
      $scope.experience.level = 1;
      $scope.experience.years = 0;
      $scope.comment = '';
      $scope.skillName = null;
      $scope.skillID = null;
      $scope.isVisible = false;
    }

    $scope.saveExperience = function() {
      var answer = {
        experience_level: $scope.experience.level,
        experience_years: $scope.experience.years,
        comment: $scope.comment,
        skill_id: $scope.skillID
      }

      $scope.answers.forEach(function(currentValue,index,array) {
        if (currentValue.skill_id === answer.skill_id) {
          array.splice(index);
        }
      });

      $scope.answers.push(answer);
      localStorage.setItem('skills', JSON.stringify($scope.answers))

      // console.log(JSON.stringify($scope.answers));
    }

    $scope.updateVisibleCategories = function(search_term){
      var match_expression = new RegExp(search_term, 'i');

      $scope.category.filter(function(item) {
        if (item.name.match(match_expression)) { item.visible = true; } 
      })

    }

    $scope.assembleCategory = function(category, search_term){
      var match_expression = new RegExp(search_term, 'i');
      
      var category_items = $scope.skills.filter(function(item){
        return item.category_id === category.id;
      });
      
      var matched_skills = category_items.filter(function(item){
        return item.name.match(match_expression);
      });
      
      var matched_categories = !!category.name.match(match_expression);

      return matched_categories || matched_skills.length > 0;
    }
  });