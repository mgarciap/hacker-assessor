function ConfigFn($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    'use strict';

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('list', {
            url: '/',
            templateUrl: "main/partials/list.html",
            controller: "ListController as ListController",
            resolve: {
                hackers: function hackers(HackerService) {
                    return HackerService.getHackers();
                }
            }
        })
        .state('create', {
            url: '/hacker/new/:id',
            templateUrl: 'main/partials/create.html',
            controller: 'CreateController as CreateController',
            resolve: {
                categories: function categories(CategoryService) {
                    return CategoryService.fetchCategories();
                },

                skills: function skills(SkillService) {
                    return SkillService.fetchSkills();
                }
            }
        })
        .state('update', {
            url: '/hacker/:id',
            templateUrl: "main/partials/update.html",
            controller: "UpdateController as UpdateController",
            resolve: {
                categories: function categories(CategoryService) {
                    return CategoryService.fetchCategories();
                },

                skills: function skills(SkillService) {
                    return SkillService.fetchSkills();
                },

                hacker: function hacker(HackerService, $stateParams) {
                    return HackerService.getHacker($stateParams.id);
                }
            }
        });

    $mdThemingProvider.definePalette('haPalette', {
        '50': '#eceff1',
        '100': '#cfd8dc',
        '200': '#b0bec5',
        '300': '#90a4ae',
        '400': '#78909c',
        '500': '#607d8b',
        '600': '#546e7a',
        '700': '#455a64',
        '800': '#37474f',
        '900': '#263238',
        'A100': '#cfd8dc',
        'A200': '#b0bec5',
        'A400': '#78909c',
        'A700': '#455a64',
        'contrastDefaultColor': 'dark',
        'contrastDarkColors': '50 100 200 300',
        'contrastStrongLightColors': '400 500'
    });

    $mdThemingProvider.theme('default')
        .primaryPalette('haPalette', {
            'default': '400',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': 'A100'
        })
        .accentPalette('blue-grey');
}

function runnable($rootScope) {
    /**
     * Pelase refer to the official documentation for more
     * on the argument list passed to the callback.
     *
     * https://github.com/angular-ui/ui-router/wiki#state-change-events
     */

    $rootScope.$on('$stateChangeError', function() {
        'use strict';

        arguments[0].preventDefault();
        console.error(arguments[5]);
    });
}
