var ecstatic = require('ecstatic');
var http = require('http');
var db = require('./db-query')
var response = require('./response');
var port = process.env.PORT || 8080;
var staticsFiles = ecstatic({ root: __dirname + '/public' });
var router = require('routes')();

router.addRoute('/', function(req, res) {
  var templateData, hackers;

  db.getHackers(function(error, result) {
    hackers = result.rows;

    templateData = {
      hackers: hackers
    };

    response.make(req, res, templateData, 'index.html.ejs');
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
