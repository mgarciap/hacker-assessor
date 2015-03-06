describe('Hacker Assessor\'s "hackerAssessor.main" module', function() {

    if (!module('hackerAssessor.main')) return;

    beforeEach(function() {
        module('hackerAssessor.main');
    });

    describe('"HackerService" factory', function() {
        var HackerService;

        beforeEach(function() {
            inject(function(_HackerService_) {
                HackerService = _HackerService_;
            });
        });

        it('should get all hackers', function() {
            expect(HackerService.hackers).toBe(null);

            HackerService.getAll().then(function() {
                expect(HackerService.hackers).not.toBe(null);
            });
        });
    });

    describe('"CategoryService" factory', function() {
        var CategoryService;

        beforeEach(function() {
            inject(function(_CategoryService_) {
                CategoryService = _CategoryService_;
            });
        });

        it('should get all categories', function() {
            expect(CategoryService.categories).toBe(null);

            CategoryService.getAll().then(function() {
                expect(CategoryService.categories).not.toBe(null);
            });
        });
    });

    describe('"SkillService" factory', function() {
        var SkillService;

        beforeEach(function() {
            inject(function(_SkillService_) {
                SkillService = _SkillService_;
            });
        });

        it('should get all skills', function() {
            expect(SkillService.skills).toBe(null);

            SkillService.getAll().then(function() {
                expect(SkillService.skills).not.toBe(null);
            });
        });
    });

    describe('"SeniorityService" factory', function() {
        var SeniorityService;

        beforeEach(function() {
            inject(function(_SeniorityService_) {
                SeniorityService = _SeniorityService_;
            });
        });

        it('should get all seniorities', function() {
            expect(SeniorityService.seniorities).toBe(null);

            SeniorityService.getAll().then(function() {
                expect(SeniorityService.seniorities).not.toBe(null);
            });
        });
    });
});
