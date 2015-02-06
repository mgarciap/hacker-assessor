describe('hackerAssessor.main', function() {
    beforeEach(function() {
        module('hackerAssessor.main');
    });
    
    describe('HelperService', function() {
        var HelperService,
            $httpBackend,
            collection = [],
            options = {
                url: '/test',
                collection: collection
            };

        beforeEach(function() {
            inject(function(_HelperService_, _$httpBackend_) {
                HelperService = _HelperService_;
                $httpBackend = _$httpBackend_;
            });

            $httpBackend.expectGET('/test')
                .respond([{key: 'value'},{key: 'value'}]);
        });

        it('fetchData() should fill options.collection', function() {
            HelperService.fetchData(options);

            expect(collection.length).toBe(0);

            $httpBackend.flush();

            expect(collection.length).toBeGreaterThan(0);
        });
    });
});