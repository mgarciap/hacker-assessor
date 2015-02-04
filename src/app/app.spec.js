describe('hackerAssessor', function() {

    describe('Router', function() {

        var $state;

        beforeEach(function() {
            module('hackerAssessor');

            inject(function(_$state_) {
                $state = _$state_;
            });
        });

        it('should check for routes existence', function() {
            expect($state.get('index')).toBeDefined();
        });

    });

});