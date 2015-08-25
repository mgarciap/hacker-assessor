describe('"HackerService" factory', function() {
  var HackerService;

  beforeEach(function() {
    if (!module('hackerAssessor.main')) return;

    module('hackerAssessor.main');

    inject(function(_HackerService_) {
      HackerService = _HackerService_;
    });
  });

  it('should get all hackers', function() {
    expect(HackerService.hackers).toBeDefined();

    HackerService.getAll().then(function() {
      expect(HackerService.hackers).not.toBe(null);
    });
  });
});
