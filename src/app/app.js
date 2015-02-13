angular.module('hackerAssessor', [
    'ui.router',
    'ngAnimate',
    'ngMaterial',
    'hackerAssessor.main',
    'hackerAssessor.directives'])
  .run(runnable)
  .config(ConfigFn);