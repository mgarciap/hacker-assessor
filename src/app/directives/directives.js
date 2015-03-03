function haStars() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/ha-stars.html',
        scope: {
            level: '=level'
        },
        link: function link(scope, element, attrs, controllers) {
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
    };
}

function haQuestion() {
    return {
        restrict: 'E',
        templateUrl: 'directives/partials/ha-question.html',
        scope: {
            skill: '=',
            question: '=',
            save: '&'
        },
        controller: function QuestionController($scope) {
            $scope.$watch('question', function() {
                $scope.save({ states: arguments, id: $scope.skill});
            }, true);
        }
    };
}
