describe('PDCP1 Tests', function() {
  it('should render categories list', function() {
    browser.get('http://localhost:8000/');
    var categoryList = element.all(by.repeater('category in categories'));
    expect(categoryList.count()).toEqual(5);
  });
});
