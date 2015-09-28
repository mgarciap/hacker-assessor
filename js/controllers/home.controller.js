angular
  .module('hackerAssessor')
  .controller('HomeController', HomeController);

HomeController.$inject = [];

function HomeController() {
  activate.call(this);

  function activate() {
    this.world = 'world';
  }
}
