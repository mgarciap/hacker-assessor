angular.module('hackerAssessor', ['ui.router', 'hackerAssessor.main'])
  .run(FirstRun)
  .config(ConfigFn);