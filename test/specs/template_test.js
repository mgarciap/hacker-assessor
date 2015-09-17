var tap = require('tap');
var template = require('../../lib/template');
var data = require('../data');

tap.test('Response for a multiple hackers', function(t) {
  var templateData = template.prepareTemplateData(['hackers'], [data.dbHackers]);
  t.equal('Jorge', templateData.hackers[0].name);
  t.end();
});

tap.test('Response for a single hacker', function(t) {
  var templateData = template.prepareTemplateData(['hacker', 'seniorities'], [data.dbHacker, data.dbSeniorities]);
  t.equal('Jorge', templateData.hacker[0].name);
  t.equal('Senior Frontend', templateData.seniorities[0].name);
  t.end();
});

tap.test('Response for a seniority to become for a single hacker', function(t) {
  var templateData = template.prepareTemplateData(['hacker', 'seniority'], [data.dbHacker, data.dbSeniority]);
  t.equal('Jorge', templateData.hacker[0].name);
  t.equal('Senior Frontend', templateData.seniority[0].name);
  t.end();
});
