// Group by module
describe('haMain', function() {

    // Initialise the module for each test
    beforeEach(module('haMain'));

    // Group by service  
    describe('SampleService', function() {
        var CommonService;

        // Setup for each test  
        beforeEach(inject(function(_CommonService_) {
            // Every test I'm going to want an instance of "CommonService"  
            CommonService = _CommonService_;
        }));

        // Tests for the newly constructed service  
        it('Contains METHOD "query"', function() {
            expect(CommonService.query).not.toBeUndefined();
        });
    });


    ////////////////
    // CONTROLLER //
    ////////////////
    describe('SampleController', function() {
        var ctrl, scope, CommonService;

        beforeEach(inject(function($controller, $rootScope, _CommonService_) {
            CommonService = _CommonService_;
            scope = $rootScope.$new();
            ctrl = $controller('CommonController', {
                "$scope": scope,
                "CommonService": CommonService
            });
        }));

        it('should initialize the scope variables', function() {
            expect(scope.name).toBe('CommonController');
            expect(typeof scope.items).toBe('object');
        });
    });

});
