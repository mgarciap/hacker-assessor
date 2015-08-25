describe('"CategoryService" factory', function() {
  var CategoryService;

  beforeEach(function() {
    if (!module('hackerAssessor.main')) return;

    module('hackerAssessor.main');

    inject(function(_CategoryService_) {
      CategoryService = _CategoryService_;
    });
  });

  it('should get all categories', function() {
    expect(CategoryService.categories).toBeDefined();

    CategoryService.getAll().then(function() {
      expect(CategoryService.categories).not.toBe(null);
    });
  });
});
