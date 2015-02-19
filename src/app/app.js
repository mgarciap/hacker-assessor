angular.module('hackerAssessor',
    [

        'ui.router',
        'ngAnimate',
        'firebase',
        'ngMaterial',
        'hackerAssessor.main',
        'hackerAssessor.directives'

    ]).run(runnable).config(ConfigFn);
