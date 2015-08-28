var ecstatic = require("ecstatic");
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');

var port = process.env["PORT"] || 8080;

// hardcoded stuff
var hackers = require('./hackers.json');
var levels = require('./levels.json');

var staticsFiles = ecstatic({ root: __dirname + '/public' });

http.createServer(function(req, res) {
  if (req.url === '/become/senior-frontend.html') {
    show_instructions(req, res, {
      hacker: hackers['Jorge'],
      level: levels['Senior Frontend']
    });
  } else {
    staticsFiles(req, res);
  }
}).listen(port);

console.log('Listening on http://localhost:' + port );

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

function show_instructions(req, res, params) {
  var lackingSkills = params.level.skills.filter(function(i) {
    return params.hacker.skills.indexOf(i) < 0;
  });

  res.end(lackingSkills.join('\n'));
}

function template (file, cb) {
  fs.readFile(__dirname + '/templates/', { encoding: 'utf8' }, cb);
}
