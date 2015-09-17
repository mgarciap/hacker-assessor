var tap = require('tap');
var template = require('../lib/template');

var dbHackers = { rows:
                  [ { id: 1,
                      name: 'Jorge',
                      skills: '[{"name":"TDD","level":1},{"name":"JavaScript","level":3},{"name":"DevTools","level":3},{"name":"Angular","level":1}]' } ] };

var dbHacker = { rows:
                 [ { id: 1,
                     name: 'Jorge',
                     skills:
                     [ { name: 'TDD', level: 1 },
                       { name: 'JavaScript', level: 3 },
                       { name: 'DevTools', level: 3 },
                       { name: 'Angular', level: 1 } ] } ] };

var dbSeniorities = { rows:
                      [ { id: 1,
                          name: 'Senior Frontend',
                          requirements: '[{"name":"Discuss Dependencies","level":2},{"name":"TDD","level":2},{"name":"JavaScript","level":3},{"name":"DevTools","level":1},{"name":"Angular","level":3},{"name":"VanillaJS","level":2},{"name":"Scrum Master","level":0}]' },
                        { id: 2,
                        name: 'Senior Full Stack JS',
                        requirements: '[{"name":"JavaScript","level":3},{"name":"Angular","level":3},{"name":"DevTools","level":2},{"name":"Node","level":3}]' } ] };

var dbSeniority = { rows:
                    [ { id: 1,
                        name: 'Senior Frontend',
                        requirements: '[{"name":"Discuss Dependencies","level":2},{"name":"TDD","level":2},{"name":"JavaScript","level":3},{"name":"DevTools","level":1},{"name":"Angular","level":3},{"name":"VanillaJS","level":2},{"name":"Scrum Master","level":0}]' } ] };

tap.test('Response for a multiple hackers', function(t) {
  var templateData = template.prepareTemplateData(['hackers'], [dbHackers]);
  t.equal('Jorge', templateData.hackers[0].name);
  t.end();
});

tap.test('Response for a single hacker', function(t) {
  var templateData = template.prepareTemplateData(['hacker', 'seniorities'], [dbHacker, dbSeniorities]);
  t.equal('Jorge', templateData.hacker[0].name);
  t.equal('Senior Frontend', templateData.seniorities[0].name);
  t.end();
});

tap.test('Response for a seniority to become for a single hacker', function(t) {
  var templateData = template.prepareTemplateData(['hacker', 'seniority'], [dbHacker, dbSeniority]);
  t.equal('Jorge', templateData.hacker[0].name);
  t.equal('Senior Frontend', templateData.seniority[0].name);
  t.end();
});
