angular.module('hackerAssessor', [
    'ui.router',
    'hackerAssessor.main',
    'ngMaterial',
    'hackerAssessor.directives'])
  .run(runnable)
  .config(ConfigFn);