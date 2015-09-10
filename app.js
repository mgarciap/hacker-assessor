const SKILL_LEVELS=['Nice to have', 'Required', 'Experience', 'Advanced']

var db = require('./db-query');
var respond = require('./response')

// hardcoded stuff
var hackers = require('./hackers.json');
var skills = require('./skills.json');

/**
 * Retrieve a named seniority from the database.
 * @param {string} name A seniority name to be retrieved from the database.
 * @param {getSeniorityCallback} callback A callback to work with the successful query result.
 *
 * @callback getSeniorityCallback
 * @param {object} error An error object.
 * @param {object} result The successful query result.
 */
exports.pathSeniority = function(name, req, res) {
  db.getSeniority(name, function(error, result) {
    var seniority = result.rows[0];
    seniority.requirements = parseRequirements(seniority.requirements);

    var needed = { hacker: hackers['Jorge'], level: seniority }
    respond.make(req, res, hackerNeededSkills(needed));
  });
}

function parseRequirements(requirements) {
  return JSON.parse('[' + requirements + ']');
}

function hackerNeededSkills(needed) {
  needed.lackingSkills = [];

  needed.level.requirements.forEach(function(needed_skill) {
    var found = false;
    needed.hacker.skills.forEach(function(skill) {
      if(!found && needed_skill.name === skill.name && needed_skill.level <= skill.level) {
        found = true;
      }
    });
    if(!found) {
      needed.lackingSkills.push(getSkill(needed_skill));
    }
  });

  return needed;
}

function getSkill(skill) {
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
    description: 'This skill isn\'t registered yet in our database.',
    pathDescription: buildLevelDescription(skill)
  };
}

function buildLevelDescription(skill) {
  level = hackerSkillLevel(skill.name)

  if (level > -1) {
    if ((SKILL_LEVELS.indexOf(skill.level) - level) === 1) {
      return 'Almost! You are so close to have this skill. ' + skill.levelDescription +
        ' Your actual level is ' + SKILL_LEVELS[level] + ' and you need ' + skill.level + '.'
    } else {
      return skill.levelDescription +
        ' You need to improve this skill because you actual level is ' +
        SKILL_LEVELS[level] + ' and you need ' + skill.level + '.'
    }
  }
  return 'You don\'t have any knowledge on this skill. ' + skill.levelDescription +
    ' You can start reading the lectures below.'
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
