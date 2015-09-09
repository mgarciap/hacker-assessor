var seniorities = require('../seniorities.json');
var sql = require('sql');
var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://hackerassessor.sqlite3');

var table = {
  seniorities: sql.define({
    name: "seniorities",
    columns: ['name', 'skills']
  })
};

var query;

for (seniority in seniorities) {
  seniority = seniorities[seniority];

  query = table.seniorities.insert({
    name: seniority.name,
    skills: seniority.skills.join(",")
  }).toQuery();

  conn.query(query.text, query.values, function (error, result) {
    if (error) {
      console.dir(error);
    } else {
      console.dir(result);
    }
  });
}
