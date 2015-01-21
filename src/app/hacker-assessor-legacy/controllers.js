function AppController($scope, 
                       categories,
                       skills,
                       SearchService,
                       AnswerFormService) {  

  $scope.categories = categories;   
  $scope.skills = skills;
  $scope.answers = [];

  $scope.answer = {
    form: {
      config: {
        visible: false
      }
    },
    data: {
      skill_name: undefined,
      skill_id: undefined,
      experience: { 
        level: 1, 
        years: 0 
      },
      comment: undefined
    }
  };

  $scope.assembleCategory = SearchService.assembleCategory;
  $scope.updateExpandedCategories = SearchService.updateExpandedCategories;
  $scope.loadForm = AnswerFormService.loadForm;
  $scope.unloadForm = AnswerFormService.unloadForm;
  $scope.saveAnswer = AnswerFormService.saveAnswer; 
 
}