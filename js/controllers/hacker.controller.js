'use strict';

angular
  .module('hackerAssessor')
  .controller('HackerController', HackerController);

HackerController.$inject = ['hackerService'];

function HackerController(hacker) {
  activate.call(this);

  function activate() {
    this.hacker = hacker;
  }
}
