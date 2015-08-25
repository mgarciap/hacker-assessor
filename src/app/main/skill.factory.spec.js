describe('"SkillService" factory', function() {
  var SkillService;

  beforeEach(function() {
    if (!module('hackerAssessor.main')) return;

    module('hackerAssessor.main');

    inject(function(_SkillService_) {
      SkillService = _SkillService_;
    });
  });

  it('should get all skills', function() {
    expect(SkillService.skills).toBeDefined();

    SkillService.getAll().then(function() {
      expect(SkillService.skills).not.toBe(null);
    });
  });
});
