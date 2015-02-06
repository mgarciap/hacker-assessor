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

        it('should have an index state', function() {
            expect($state.get('index')).toBeDefined();
        });

    });

});