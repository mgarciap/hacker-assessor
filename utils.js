const SKILL_LEVELS=['Nice to have', 'Required', 'Experience', 'Advanced']

// hardcoded stuff
var hackers = require('./data/json/hackers.json');
var skills = require('./data/json/skills.json');

module.exports = {
  hackerNeededSkills: hackerNeededSkills,
  parseSeniority: parseSeniority,
  getSkill: getSkill,
  buildLevelDescription: buildLevelDescription,
  hackerSkillLevel: hackerSkillLevel
}

function hackerNeededSkills(seniority) {
  var needed = parseSeniority(seniority);

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

function parseSeniority(seniority) {
  seniority.requirements = JSON.parse('[' + seniority.requirements + ']');
  return { hacker: hackers['Jorge'], level: seniority }
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
