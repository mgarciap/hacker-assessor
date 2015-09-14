var tap = require('tap');
var app = require('../app');
var utils = require('../utils');
var skills = require('../data/json/skills.json');

var seniority = { id: 1,
  name: 'Senior Frontend',
  requirements: '{"name":"Discuss Dependencies","level":2},{"name":"Time Traveler","level":3}' };

var parse = utils.parseSeniority(seniority);

tap.test('Parse a seniority retrieved from the DB', function(t) {
  t.equal('Jorge', parse.hacker.name);
  t.equal('Senior Frontend', parse.level.name);
  t.equal('Discuss Dependencies', parse.level.requirements[0].name);
  t.end();
});

tap.test('Get a needed skill', function(t) {
  tap.test('If the skill exists', function(tt) {
    var skill = utils.getSkill(parse.level.requirements[0]);
    tt.equal('Discuss Dependencies', skill.name);
    tt.equal('Experience', skill.level);
    tt.end();
  })

  tap.test('If the skill don\'t exists', function(tt) {
    var skill = utils.getSkill(parse.level.requirements[1]);
    tt.equal('Time Traveler', skill.name);
    tt.equal('Advanced', skill.level);
    tt.equal('This skill isn\'t registered yet in our database.', skill.description);
    tt.end();
  })

  t.end();
});

tap.test('Get the skill level for a needed skill', function(t) {
  tap.test('If the hacker have the needed skill', function(tt) {
    var level = utils.hackerSkillLevel('TDD');
    tt.equal(1, level);
    tt.end();
  })

  tap.test('If the hacker don\'t have the needed skill', function(tt) {
    var level = utils.hackerSkillLevel('Discuss Dependencies');
    tt.equal(-1, level);
    tt.end();
  })

  t.end();
});

tap.test('Build a level description for a needed skill', function(t) {
  tap.test('If the hacker have 1 point of difference', function(tt) {
    skills[0].level = 'Experience'
    var description = utils.buildLevelDescription(skills[0]);
    tt.notEqual(-1, description.indexOf('Almost!'));
    tt.end();
  })

  tap.test('If the hacker have more than 1 point of difference', function(tt) {
    skills[0].level = 'Advanced'
    var description = utils.buildLevelDescription(skills[4]);
    tt.notEqual(-1, description.indexOf('improve'));
    tt.end();
  })

  tap.test('If the hacker don\'t have the skill', function(tt) {
    skills[1].level = 'Advanced'
    var description = utils.buildLevelDescription(skills[1]);
    tt.notEqual(-1, description.indexOf('knowledge'));
    tt.end();
  })

  t.end();
});
