function ConfigFn($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    'use strict';

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            views: {
                "body": {
                    templateUrl: "main/partials/body.html",
                    controller: "HomeController as HomeController"
                },
                "header@home": {
                    templateUrl: "main/partials/header.html"
                },
                "title@home": {
                    templateUrl: "main/partials/home-header-title.html"
                },
                "controls@home": {
                    templateUrl: "main/partials/home-header-controls.html"
                }
            }
        })
        .state('list', {
            url: '/hackers',
            views: {
                "body": {
                    templateUrl: "main/partials/body.html",
                    controller: "HackersController as HackersController"
                },
                "header@list": {
                    templateUrl: "main/partials/header.html"
                },
                "title@list": {
                    templateUrl: "main/partials/hacker-header-title.html"
                },
                "controls@list": {
                    templateUrl: "main/partials/list-header-controls.html"
                },
                "main@list": {
                    templateUrl: "main/partials/list-main.html"
                }
            },
            resolve: {
                hackers: function hackers(HackerService) {
                    return HackerService.getAll();
                },

                authentic: function authentic(AuthService) {
                    return AuthService.auth().$requireAuth();
                }
            }
        })
        .state('edit', {
            url: '/hacker/:id',
            views: {
                "body": {
                    templateUrl: "main/partials/body.html",
                    controller: "HackerController as HackerController"
                },
                "header@edit": {
                    templateUrl: "main/partials/header.html"
                },
                "title@edit": {
                    templateUrl: "main/partials/hacker-header-title.html"
                },
                "input@edit": {
                    templateUrl: "main/partials/hacker-header-controls-input.html"
                },
                "controls@edit": {
                    templateUrl: "main/partials/hacker-header-controls.html"
                },
                "main@edit": {
                    templateUrl: "main/partials/hacker-main.html"
                }
            },
            resolve: {
                categories: function categories(CategoryService) {
                    return CategoryService.getAll();
                },

                skills: function skills(SkillService) {
                    return SkillService.getAll();
                },

                hacker: function hacker(HackerService, $stateParams) {
                    return HackerService.getOne($stateParams.id);
                },

                hackers: function hackers(HackerService) {
                    return HackerService.getAll();
                },

                authentic: function authentic(AuthService) {
                    return AuthService.auth().$requireAuth();
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
