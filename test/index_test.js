var tap = require('tap');
var respond = require('../response');
var hackers = require('../data/json/hackers.json');
var fs = require('fs');

var req = {}
var res = {}
res.setHeader = function(){}

tap.test('Response for a single hacker', function(t) {
  res.end = function (response) {
    t.equal(response, fs.readFileSync(__dirname + '/index_test.html', { encoding: 'utf8' }));
    t.end();
  }
  respond.make(req, res, { hackers: [{ id: 1, name: 'Jorge' }] }, 'index.html.ejs');
});
