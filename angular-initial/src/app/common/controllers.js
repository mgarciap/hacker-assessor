function CommonController($scope, CommonService) {
    $scope.name = 'CommonController';
    $scope.items = [];

    CommonService.query().then(function(response) {
        $scope.items = response;
    });
}
