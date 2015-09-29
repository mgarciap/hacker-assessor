'use strict';

angular
  .module('hackerAssessor')
  .service('hackerService', hackerService);

hackerService.$inject = ['$http'];

function hackerService($http) {
  this.getHacker = getHacker;

  function getHacker(id) {
    return $http.get('/hacker/' + id)
      .then(function(data) {
        return data;
      }, function(error) {
        console.error(error);
      });
  }
}
