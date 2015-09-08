var ecstatic = require("ecstatic");
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var connection = require("./connection");

var port = process.env.PORT || 8080;

var seniorities = require('./models/seniorities');

// hardcoded stuff
var hackers = require('./hackers.json');
var skills = require('./skills.json');

var staticsFiles = ecstatic({ root: __dirname + '/public' });

http.createServer(function(req, res) {
  if (req.url === '/become/senior-frontend.html') {
    getSeniority('Senior Frontend', getSeniorityCallback);
  } else if (req.url === '/become/senior-full-stack-js.html') {
    getSeniority('Senior Full Stack JS', getSeniorityCallback);
  } else {
    staticsFiles(req, res);
  }

  function getSeniorityCallback(error, result) {
    if (error) { console.error(error); }

    var seniority = result.rows[0];
    seniority.skills = seniority.skills.split(",");

    show_instructions(req, res, {
      hacker: hackers['Jorge'],
      level: seniority
    });
  }
}).listen(port);

console.log('Listening on http://localhost:' + port );

function show_instructions(req, res, params) {
  params.lackingSkills = params.level.skills.filter(function(i) {
    return params.hacker.skills.indexOf(i) < 0;
  });

  params.lackingSkills = params.lackingSkills.map(function(skillName, index) {
    return findSkill(skillName);

    function findSkill (skillName) {
      for (var i=0; i < skills.length; i++) {
        if (skills[i].name === skillName) {
          return skills[i];
        }
      }
      return {
        name: skillName,
        description: "This skill isn't registered yet in our database."
      };
    }
  });

  template('hacker.html.ejs', function(err, file) {
    res.statusCode = 200;
    res.statusMessage = 'Success';
    res.setHeader("Content-Type", "text/html");
    res.end(ejs.compile(file)(params));
  });
}

/**
 * @function template
 * @desc
 * @param file is a filename of a template.
 * @param cb
 */
function template (fileName, cb) {
  fs.readFile(__dirname + '/templates/' + fileName, { encoding: 'utf8' }, cb);
}

/**
 * Put inside here all the code that uses the template file.
 * @callback templateCallback
 * @param {object} error
 * @param {string} file
 */




/**
 * Retrieve a named seniority from the database.
 * @param {string} name - A seniority name to be retrieved from the database.
 * @param {getSeniorityCallback} callback - A callback to work with the query result.
 */
function getSeniority(name, callback) {
  var query = seniorities
    .select(seniorities.star())
    .where(seniorities.name.equals(name))
    .toQuery();

  connection().query(query.text, query.values, callback);
}

/**
 * @callback getSeniorityCallback
 * @param {object} error - An error object.
 * @param {rows: array,
 *        fields: array,
 *        rowCount: number,
 *        lastInsertId: {(undefined|number)}} result - The query result.
 */
