const SKILL_LEVELS=['Nice to have', 'Required', 'Experience', 'Advanced']

// hardcoded stuff
var hackers = require('./data/json/hackers.json');
var skills = require('./data/json/skills.json');

module.exports = {
  hackerNeededSkills: hackerNeededSkills,
  buildLevelDescription: buildLevelDescription,
  getSkill: getSkill
}

function hackerNeededSkills(hacker, seniority) {
  hacker.skills.forEach(function(skill) {
    var requirement, i = seniority.requirements.length - 1;

    while (i--) {
      requirement = seniority.requirements[i];

      if (skill.name === requirement.name) {
        if (skill.level >= requirement.level) {
          seniority.requirements.splice(i, 1);
        } else {
          requirement.level = {
            necessary: requirement.level,
            achieved: skill.level
          };
        }
      }
    }
  });

  seniority.requirements = seniority.requirements.map(function(requirement) {
    if (typeof requirement.level === 'number') {
      requirement.level = {
        necessary: requirement.level,
        achieved: -1
      };
    }

    return getSkill(requirement);
  });

  return {
    hacker: hacker,
    seniority: seniority
  };
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
