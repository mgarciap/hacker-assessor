// Group by module
describe('angular-initial.module1', function() {

    // Initialise the module for each test
    beforeEach(module('angular-initial.module1'));

    ////////////////
    // CONTROLLER //
    ////////////////
    describe('Module1Controller', function() {
        var ctrl, some_array, Module1Service;

        beforeEach(inject(function($controller, _Module1Service_) {
            some_array = ['some', 'some more'];
            Module1Service = _Module1Service_;
            ctrl = $controller('Module1Controller', {
                "Module1Service": Module1Service,
                "some_array": some_array
            });
        }));

        it('should initialize the ctrl variables', function() {
            expect(ctrl.name).toBe('Module1Controller');
            expect(typeof ctrl.items).toBe('object');
            expect(Module1Service).toBeDefined();
            expect(ctrl.items[0]).toBe(some_array[0]);
        });
    });

});
