angular.module('hackerAssessor', ['ui.router', 'hackerAssessor.main', 'ngMaterial'])
  .run(runnable)
  .config(ConfigFn);