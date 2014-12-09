(function(){ 
  var app = angular.module('catalogo',['ui.bootstrap']),
      body = document.body,
      form = document.getElementById('form')
      nivel = document.getElementById('nivel'),
      experiencia = document.getElementById('experiencia'),
      comentario = document.getElementById('comentario'),
      height = angular.element(form).css('height');

  app.controller('CatalogoCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.answers = [];
    $scope.categories = [];
    $scope.skills = [];
    $scope.isVisible = false;
    $scope.skillName;
    $scope.skillID;

    $http.get('api/1/categories.json').success(function(data){
      $scope.categories = data;
    });

    $http.get('api/1/skills.json').success(function(data){
      $scope.skills = data;
    });

    $scope.loadForm = function(skillID,skillName) {
      $scope.skillName = skillName;
      $scope.skillID = skillID;
      $scope.isVisible = true;
    }

    $scope.closeForm = function() {
      angular.element(nivel).val(1);
      angular.element(experiencia).val(null);
      angular.element(comentario).val(null);
      $scope.skillName = null;
      $scope.skillID = null;
      $scope.isVisible = false;
    }

    $scope.saveExperience = function() {
      var answer = {
        nivel: angular.element(nivel).val(),
        experiencia: angular.element(experiencia).val(),
        comentario: angular.element(comentario).val(),
        skill_id: $scope.skillID
      }
      $scope.answers.every(function(currentValue,index,array) {
        if (currentValue.skill_id === answer.skill_id) {
          array.splice(index);
        }
      });
      $scope.answers.push(answer);
      console.log(JSON.stringify($scope.answers));
    }
  }]);
})();
