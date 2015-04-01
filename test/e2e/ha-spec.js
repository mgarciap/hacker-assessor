describe('Hacker Assessor\'s', function() {

    describe('\'home\' state.', function() {

        it('should have a login button', function() {
            browser.get('http://localhost:3000');

            browser.isElementPresent(by.css('button[ng-click="HomeController.login()"]'))
                .then(function(present){
                    expect(present).toBe(true);
                })
        });
    });
});
