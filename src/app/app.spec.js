describe('hackerAssessor', function() {

    if (!module('hackerAssessor')) return;

    beforeEach(function() {
        module('hackerAssessor');
    });

    describe('States', function() {

        var $state;

        beforeEach(function() {
            inject(function(_$state_) {
                $state = _$state_;
            });
        });

        it('should have a home state', function() {
            expect($state.get('home')).toBeDefined();
        });

        it('should have a list state', function() {
            expect($state.get('list')).toBeDefined();
        });

        it('should have an edit state', function() {
            expect($state.get('edit')).toBeDefined();
        });

    });

});
