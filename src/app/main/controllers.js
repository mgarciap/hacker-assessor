function FormController($scope, categories, questions) {
  $scope.categories = categories;
  // $scope.questions = questions;
  questions.forEach(function (question) {
    categories.forEach(function (category) {
      if(question.skill.category_id === category.id){
        category.questions = category.questions || [];
        category.questions.push(question);
      }
      
      
    })
    
  })
}