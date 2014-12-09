(function(){ 
  var app = angular.module('catalogo',['ui.bootstrap']),
      body = document.body,
      nivel = document.getElementById('nivel'),
      experiencia = document.getElementById('experiencia'),
      comentario = document.getElementById('comentario'),
      height = angular.element(body).css('padding-bottom');

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
      angular.element(body).css('padding-bottom', height);
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
      angular.element(body).css('padding-bottom', '0px');
      $scope.isVisible = false;
    }

    $scope.saveExperience = function() {
      var answer = {
        nivel: angular.element(nivel).val(),
        experiencia: angular.element(experiencia).val(),
        comentario: angular.element(comentario).val(),
        skill_id: $scope.skillID
      }
      $scope.answers.push(answer);
      console.log(JSON.stringify($scope.answers));
    }
  }]);
})();
