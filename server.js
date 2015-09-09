const SKILL_LEVELS=["Nice to have", "Required", "Experience", "Advanced"]

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

    show_instructions(req, res, {
    seniority.requirements = JSON.parse("[" + seniority.requirements + "]");
      hacker: hackers['Jorge'],
      level: seniority
    });
  }
}).listen(port);

console.log('Listening on http://localhost:' + port );

function show_instructions(req, res, params) {
  params.lackingSkills = [];
  params.level.requirements.forEach(function(needed_skill) {
    var found = false;
    params.hacker.skills.forEach(function(skill) {
      if(!found && needed_skill.name === skill.name && needed_skill.level <= skill.level) {
        found = true;
      }
    });
    if(!found) {
      params.lackingSkills.push(getSkill(needed_skill));
    }
  });

  function getSkill (skill) {
    for (var i=0; i < skills.length; i++) {
      if (skills[i].name === skill.name) {
        skills[i].level = SKILL_LEVELS[skill.level];
        skills[i].pathDescription = buildLevelDescription(skills[i]);
        return skills[i];
      }
    }
    return {
      name: skill.name,
      level: SKILL_LEVELS[skill.level],
      description: "This skill isn't registered yet in our database.",
      pathDescription: buildLevelDescription(skill)
    };
  }

  template('hacker.html.ejs', function(err, file) {
    res.statusCode = 200;
    res.statusMessage = 'Success';
    res.setHeader("Content-Type", "text/html");
    res.end(ejs.compile(file)(params));
  });
}

function buildLevelDescription(skill) {
  level = hackerSkillLevel(skill.name)
  if (level > -1) {
    if ((SKILL_LEVELS.indexOf(skill.level) - level) === 1) {
      return "Almost! You are so close to have this skill. " + skill.levelDescription +
        " Your actual level is " + SKILL_LEVELS[level] + " and you need " + skill.level + "."
    } else {
      return skill.levelDescription +
        " You need to improve this skill because you actual level is " +
        SKILL_LEVELS[level] + " and you need " + skill.level + "."
    }
  }
  return "You don't have any knowledge on this skill. " + skill.levelDescription +
    " You can start reading the lectures below."
};

function hackerSkillLevel(name) {
  var skills = hackers['Jorge'].skills;
  for (var i=0; i < skills.length; i++) {
    if (skills[i].name === name) {
      return skills[i].level;
    }
  }
  return -1;
};

/**
 * Make a template file available to work with.
 * @param {string} fileName Is a filename of a template inside the templates folder.
 * @param {templateCallback} callback A callback to work with the template file.
 *
 * @callback templateCallback
 * @summary Put inside here all the code that uses the template file.
 * @param {object} error
 * @param {string} file
 */
function template (fileName, callback) {
  fs.readFile(__dirname + '/templates/' + fileName, { encoding: 'utf8' }, callback);
}

/**
 * Retrieve a named seniority from the database.
 * @param {string} name A seniority name to be retrieved from the database.
 * @param {getSeniorityCallback} callback A callback to work with the successful query result.
 *
 * @callback getSeniorityCallback
 * @param {object} error An error object.
 * @param {object} result The successful query result.
 */
function getSeniority(name, callback) {
  var query = seniorities
    .select(seniorities.star())
    .where(seniorities.name.equals(name))
    .toQuery();

  connection().query(query.text, query.values, callback);
}
