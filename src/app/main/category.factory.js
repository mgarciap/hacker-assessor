(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .factory('CategoryService', CategoryService);

  CategoryService.$inject = ['$firebaseObject', 'BASE_PATH'];

  function CategoryService($firebaseObject, BASE_PATH) {
    var ref = new Firebase(BASE_PATH + "categories");

    var service = {
      categories: null,

      getAll: function getAll() {
        function loaded(categories) {
          this.categories = categories;
          return this.categories;
        }

        return $firebaseObject(ref).$loaded(loaded.bind(this));
      }
    };

    return service;
  }
})();
