angular.module('catalogo',['ui.bootstrap'])
  .controller('CatalogoCtrl', function ($scope,$http) {
    var form = document.getElementById('form'),
        height = angular.element(form).css('height');

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
      $scope.nivel = answer.nivel;
      $scope.experiencia = answer.experiencia;
      $scope.comentario = answer.comentario;
      $scope.skillName = skillName;
      $scope.skillID = skillID;
      $scope.isVisible = true;
    }

    $scope.closeForm = function() {
      $scope.nivel = 1;
      $scope.experiencia = '';
      $scope.comentario = '';
      $scope.skillName = null;
      $scope.skillID = null;
      $scope.isVisible = false;
    }

    $scope.saveExperience = function() {
      var answer = {
        nivel: $scope.nivel,
        experiencia: $scope.experiencia,
        comentario: $scope.comentario,
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

    $scope.updateVisibleCategories = function(busqueda){

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
  });