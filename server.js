var http = require('http');
var db = require('./db-query')
var response = require('./response');
var utils = require('./utils');
var port = process.env.PORT || 8080;
var ecstatic = require('ecstatic');
var staticsFiles = ecstatic({ root: __dirname + '/public' });
var router = require('routes')();
var template = require('./buildTemplateView');

router.addRoute('/', function(req, res) {
  var templateData, hackers;

  db.getHackers(function(error, result) {
    templateData = template.prepareTemplateData(result);
    response.make(req, res, templateData, 'index.html.ejs');
  });
});

router.addRoute('/hackers/:hacker_id', function(req, res, params) {
  var templateData, hacker, seniorities;

  db.getHacker(params.hacker_id, function(error, result) {
    hacker = result.rows[0];

    hacker.skills = JSON.parse(hacker.skills);

    db.getSeniorities(function(error, result) {
      seniorities = result.rows;

      templateData = {
        hacker: hacker,
        seniorities: seniorities
      };

      response.make(req, res, templateData, 'hacker.html.ejs');
    });
  });
});

router.addRoute('/hackers/:hacker_id/become/seniority/:seniority_id', function(req, res, params) {
  var templateData, hacker, seniority;

  db.getHacker(params.hacker_id, function(error, result) {
    hacker = result.rows[0];
    hacker.skills = JSON.parse(hacker.skills);

    db.getSeniority(params.seniority_id, function(error, result) {
      seniority = result.rows[0];
      seniority.requirements = JSON.parse(seniority.requirements);

      templateData = utils.hackerNeededSkills(hacker, seniority);

      response.make(req, res, templateData, 'seniority.html.ejs');
    });
  });
});

http.createServer(function(req, res) {
  var matched = router.match(req.url);

  if (matched) {
    matched.fn(req, res, matched.params);
  } else {
    staticsFiles(req, res)
  }
}).listen(port);

console.log('Listening on http://localhost:' + port );
