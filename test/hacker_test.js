var tap = require('tap');
var utils = require('../utils');

var hacker = { id: 1,
               name: 'Jorge',
               skills:
                 [ { name: 'TDD', level: 1 },
                   { name: 'JavaScript', level: 3 },
                   { name: 'DevTools', level: 3 },
                   { name: 'Angular', level: 1 } ] };

var seniority = { id: 1,
                  name: 'Senior Frontend',
                  requirements:
                    [ { name: 'Discuss Dependencies', level: 2 },
                      { name: 'TDD', level: 2 },
                      { name: 'JavaScript', level: 3 },
                      { name: 'Time Traveler', level: 3 },
                      { name: 'Angular', level: 3 },
                      { name: 'VanillaJS', level: 2 },
                      { name: 'Scrum Master', level: 0 } ] };

tap.test('Get all the needed skills for a single hacker', function(t) {
  var neededSkills = utils.hackerNeededSkills(hacker, seniority);
  t.equal('Jorge', neededSkills.hacker.name);
  t.equal('Senior Frontend', neededSkills.seniority.name);

  tap.test('If the hacker don\'t have the skill', function(tt) {
    var requirement = neededSkills.seniority.requirements[0]
    tt.equal('Discuss Dependencies', requirement.name);
    tt.equal(2, requirement.level.necessary);
    tt.equal(-1, requirement.level.achieved);
    tt.end();
  })

  tap.test('If the hacker have the skill', function(tt) {

    tap.test('But don\'t have the necessary level', function(ttt) {
      var requirement = neededSkills.seniority.requirements[1]
      ttt.equal('TDD', requirement.name);
      ttt.equal(2, requirement.level.necessary);
      ttt.equal(1, requirement.level.achieved);
      ttt.end();
    })

    tap.test('And achieved the necessary level', function(ttt) {
      var requirement = neededSkills.seniority.requirements[2]
      ttt.notEqual('JavaScript', requirement.name);
      ttt.end();
    })

    tt.end();
  })

  t.end();
});

tap.test('Get a needed skill', function(t) {
  tap.test('If the skill exists', function(tt) {
    var skill = utils.getSkill(seniority.requirements[1]);
    tt.equal('TDD', skill.name);
    tt.equal(2, skill.level.necessary);
    tt.equal(-1, skill.description.indexOf('database'));
    tt.end();
  })

  tap.test('If the skill don\'t exists', function(tt) {
    var skill = utils.getSkill(seniority.requirements[2]);
    tt.equal('Time Traveler', skill.name);
    tt.equal(3, skill.level.necessary);
    tt.notEqual(-1, skill.description.indexOf('database'));
    tt.end();
  })

  t.end();
});

tap.test('Build a level description for a needed skill', function(t) {
  tap.test('If the hacker have 1 point of difference', function(tt) {
    var description = utils.buildLevelDescription(seniority.requirements[1]);
    tt.notEqual(-1, description.indexOf('Almost!'));
    tt.end();
  })

  tap.test('If the hacker have more than 1 point of difference', function(tt) {
    var description = utils.buildLevelDescription(seniority.requirements[3]);
    tt.notEqual(-1, description.indexOf('improve'));
    tt.end();
  })

  tap.test('If the hacker don\'t have the skill', function(tt) {
    var description = utils.buildLevelDescription(seniority.requirements[0]);
    tt.notEqual(-1, description.indexOf('knowledge'));
    tt.end();
  })

  t.end();
});
