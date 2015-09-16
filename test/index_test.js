var tap = require('tap');
var template = require('../buildTemplateView');

var dbResult = { rows:
                 [ { id: 1,
                     name: 'Jorge',
                     skills: '[{"name":"TDD","level":1},{"name":"JavaScript","level":3},{"name":"DevTools","level":3},{"name":"Angular","level":1}]' }
                 ] };

tap.test('Response for a single hacker', function(t) {
  var templateData = template.prepareTemplateData(['hackers'], [dbResult]);
  t.equal('Jorge', templateData.hackers[0].name);
  t.end();
});
