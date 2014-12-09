(function(){ 
  var app = angular.module('catalogo',['ui.bootstrap']);

  app.controller('CatalogoCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.categories = [];
    $scope.skills =[]

    $http.get('api/1/categories.json').success(function(data){
      $scope.categories = data;
    });

    $http.get('api/1/skills.json').success(function(data){
      $scope.skills = data;
    });

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
      isFirstOpen: false,
      isFirstDisabled: false
    };
  }]);
})();
