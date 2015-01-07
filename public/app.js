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

    function loadPreviousAnswer (skillID) {
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
      angular.element(nivel).val(answer.nivel);
      angular.element(experiencia).val(answer.experiencia);
      angular.element(comentario).val(answer.comentario);


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
      $scope.answers.forEach(function(currentValue,index,array) {
        if (currentValue.skill_id === answer.skill_id) {
          array.splice(index);
        }
      });

      $scope.answers.push(answer);
      localStorage.setItem('skills', JSON.stringify($scope.answers))

      // console.log(JSON.stringify($scope.answers));
    }


    $scope.shouldDisplayCategory = function(category, busqueda){
        var busca = new RegExp(busqueda, 'i');

        var items_categoria = $scope.skills.filter(function(item){
          return item.category_id === category.id;
        });
        
        var match_skills = items_categoria.filter(function(item){
          return item.name.match(busca);
        });
        
        var match_category = !!category.name.match(busca);

        return match_category || match_skills.length>0;
    }


  }]);
})();
