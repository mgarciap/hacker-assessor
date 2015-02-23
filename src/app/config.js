function ConfigFn($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    'use strict';

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: "main/partials/home.html",
            controller: "HomeController as HomeController"
        })
        .state('list', {
            url: '/hackers',
            templateUrl: "main/partials/list.html",
            controller: "HackerListController as HackerListController",
            resolve: {
                hackers: function hackers(HackerService) {
                    return HackerService.getHackers();
                },

                authentic: function authentic(HelperService) {
                    return HelperService.auth().$requireAuth();
                }
            }
        })
        .state('create', {
            url: '/hacker/new/:id',
            templateUrl: 'main/partials/hacker.html',
            controller: 'HackerController as HackerController',
            resolve: {
                categories: function categories(CategoryService) {
                    return CategoryService.fetchCategories();
                },

                skills: function skills(SkillService) {
                    return SkillService.fetchSkills();
                },

                hacker: function hacker() {
                    return { name: null, skills: [] };
                },

                authentic: function authentic(HelperService) {
                    return HelperService.auth().$requireAuth();
                }
            }
        })
        .state('update', {
            url: '/hacker/:id',
            templateUrl: "main/partials/hacker.html",
            controller: "HackerController as HackerController",
            resolve: {
                categories: function categories(CategoryService) {
                    return CategoryService.fetchCategories();
                },

                skills: function skills(SkillService) {
                    return SkillService.fetchSkills();
                },

                hacker: function hacker(HackerService, $stateParams) {
                    return HackerService.getHacker($stateParams.id);
                },

                authentic: function authentic(HelperService) {
                    return HelperService.auth().$requireAuth();
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

        /**
         * Catch the error thrown when the $requireAuth promise is
         * rejected and redirect the user back to the home page.
         */
        if (arguments[5] === "AUTH_REQUIRED") {
            $state.go("home");
        }

        console.error(arguments[5].stack);
    });
}
