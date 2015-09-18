var http = require('http');
var port = process.env.PORT || 8080;
var ecstatic = require('ecstatic');
var staticsFiles = ecstatic({ root: __dirname + '/public' });
var router = require('routes')();
var routes = require('./lib/routes')

router.addRoute('/', routes.indexPage);

router.addRoute('/login', routes.loginPage);

router.addRoute('/hackers/:hacker_id', routes.singleHackerPage);

router.addRoute('/hackers/:hacker_id/become/seniority/:seniority_id', routes.becomeSeniority);

http.createServer(function(req, res) {
  var matched = router.match(req.url);

  if (matched) {
    matched.fn(req, res, matched.params);
  } else {
    staticsFiles(req, res)
  }
}).listen(port);

console.log('Listening on http://localhost:' + port );
