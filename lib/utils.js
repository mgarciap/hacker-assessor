const SKILL_LEVELS=['Nice to have', 'Required', 'Experience', 'Advanced']

// hardcoded stuff
var skills = require('../data/json/skills.json');

module.exports = {
  matchRequirements: matchRequirements,
  hackerNeededSkills: hackerNeededSkills,
  buildLevelDescription: buildLevelDescription,
  getSkill: getSkill
}

function matchRequirements(skills, requirements) {
  var j = requirements.length;

  while (j--) {
    var i = skills.length;

    while (i--) {
      if (skills[i].name === requirements[j].name) {
        if (skills[i].level >= requirements[j].level) {
          requirements.splice(j, 1);
        } else {
          requirements[j].level = {
            necessary: requirements[j].level,
            achieved: skills[i].level
          };
          requirements[j] = getSkill(requirements[j]);
        }
      }
    }

    if (typeof requirements[j].level === 'number') {
      requirements[j].level = {
        necessary: requirements[j].level,
        achieved: -1
      };
      requirements[j] = getSkill(requirements[j]);
    }
  }

  return requirements;
}


function hackerNeededSkills(hacker, seniority) {
  seniority.requirements = matchRequirements(hacker.skills, seniority.requirements);
  return seniority;
}

function getSkill(skill) {
  for (var i=0; i < skills.length; i++) {
    if (skills[i].name === skill.name) {
      skills[i].level = skill.level;
      skills[i].pathDescription = buildLevelDescription(skills[i]);
      return skills[i];
    }
  }
  return {
    name: skill.name,
    level: skill.level,
    description: 'This skill isn\'t registered yet in our database.',
    pathDescription: buildLevelDescription(skill)
  };
}

function buildLevelDescription(skill) {
  if (skill.level.achieved > -1) {
    if ((skill.level.necessary - skill.level.achieved) === 1) {
      return 'Almost! You are so close to have this skill. ' + skill.levelDescription +
        ' Your actual level is ' + SKILL_LEVELS[skill.level.achieved] + ' and you need ' + SKILL_LEVELS[skill.level.necessary] + '.'
    } else {
      return skill.levelDescription +
        ' You need to improve this skill because you actual level is ' +
        SKILL_LEVELS[skill.level.achieved] + ' and you need ' + SKILL_LEVELS[skill.level.necessary] + '.'
    }
  }
  return 'You don\'t have any knowledge on this skill. ' + skill.levelDescription +
    ' You can start reading the lectures below.'
};
