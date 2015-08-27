var ecstatic = require("ecstatic");
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');

var staticsFiles = ecstatic({ root: __dirname + '/public' });

http.createServer(function(req, res) {
  if (req.url === '/skills/tdd.html') {
    skill('tdd', res);
  } else {
    staticsFiles(req, res);
  }
}).listen(8080);

console.log('Listening on http://localhost:8080');

function skill(skill_name, res) {
  var skill = require( __dirname + '/app/skills/' + skill_name + '.json');
  fs.readFile(__dirname + '/templates/skills.html.ejs', { encoding: 'utf8' },
      function(err, string) {
        var template = ejs.compile(string);

        res.statusCode = 200;
        res.statusMessage = 'Success';
        res.setHeader("Content-Type", "text/html");
        res.end(template(skill));
  });
}
