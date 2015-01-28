angular.module('hackerAssessor', ['ui.router', 'hackerAssessor.main', 'ngMaterial'])
  .run(FirstRun)
  .config(ConfigFn);