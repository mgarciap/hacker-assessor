var hacker, seniority, dbHackers, dbHacker, dbSeniorities, dbSeniority;

hacker = { id: 1,
           name: 'Jorge',
           skills:
             [ { name: 'TDD', level: 1 },
               { name: 'JavaScript', level: 3 },
               { name: 'DevTools', level: 3 },
               { name: 'Angular', level: 1 } ] };

seniority = { id: 1,
              name: 'Senior Frontend',
              requirements:
                [ { name: 'Discuss Dependencies', level: 2 },
                  { name: 'TDD', level: 2 },
                  { name: 'JavaScript', level: 3 },
                  { name: 'Time Traveler', level: 3 },
                  { name: 'Angular', level: 3 },
                  { name: 'VanillaJS', level: 2 },
                  { name: 'Scrum Master', level: 0 } ] };

dbHackers = { rows:
              [ { id: 1,
                  name: 'Jorge',
                  skills: '[{"name":"TDD","level":1},{"name":"JavaScript","level":3},{"name":"DevTools","level":3},{"name":"Angular","level":1}]' } ] };

dbHacker = { rows:
             [ { id: 1,
                 name: 'Jorge',
                 skills:
                 [ { name: 'TDD', level: 1 },
                   { name: 'JavaScript', level: 3 },
                   { name: 'DevTools', level: 3 },
                   { name: 'Angular', level: 1 } ] } ] };

dbSeniorities = { rows:
                  [ { id: 1,
                      name: 'Senior Frontend',
                      requirements: '[{"name":"Discuss Dependencies","level":2},{"name":"TDD","level":2},{"name":"JavaScript","level":3},{"name":"DevTools","level":1},{"name":"Angular","level":3},{"name":"VanillaJS","level":2},{"name":"Scrum Master","level":0}]' },
                    { id: 2,
                    name: 'Senior Full Stack JS',
                    requirements: '[{"name":"JavaScript","level":3},{"name":"Angular","level":3},{"name":"DevTools","level":2},{"name":"Node","level":3}]' } ] };

dbSeniority = { rows:
                [ { id: 1,
                    name: 'Senior Frontend',
                    requirements: '[{"name":"Discuss Dependencies","level":2},{"name":"TDD","level":2},{"name":"JavaScript","level":3},{"name":"DevTools","level":1},{"name":"Angular","level":3},{"name":"VanillaJS","level":2},{"name":"Scrum Master","level":0}]' } ] };

module.exports = {
  hacker: hacker,
  seniority: seniority,
  dbHackers: dbHackers,
  dbHacker: dbHacker,
  dbSeniorities: dbSeniorities,
  dbSeniority: dbSeniority
}
