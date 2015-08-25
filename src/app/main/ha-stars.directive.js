(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .directive('haStars', haStars);

  function haStars() {
    var directive = {
      restrict: 'E',
      templateUrl: 'main/partials/ha-stars.html',
      scope: {
        level: '=level'
      },
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, element, attrs, controllers) {
      var stars = element.children(0).children(1);

      stars.on('focus', function(event) {
        angular.element(event.target)
          .children()
          .addClass('highlight');
      });

      stars.on('blur', function(event) {
        angular.element(event.target)
          .children()
          .removeClass('highlight');
      });

      scope.setLevel = function setLevel(level) {
        scope.level = scope.level == level ? scope.level - 1 : level;
      };
    }
  }
})();
