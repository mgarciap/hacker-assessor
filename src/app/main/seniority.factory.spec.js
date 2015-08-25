describe('"SeniorityService" factory', function() {
  var SeniorityService;

  beforeEach(function() {
    if (!module('hackerAssessor.main')) return;

    module('hackerAssessor.main');

    inject(function(_SeniorityService_) {
      SeniorityService = _SeniorityService_;
    });
  });

  it('should get all seniorities', function() {
    expect(SeniorityService.seniorities).toBeDefined();

    SeniorityService.getAll().then(function() {
      expect(SeniorityService.seniorities).not.toBe(null);
    });
  });
});
