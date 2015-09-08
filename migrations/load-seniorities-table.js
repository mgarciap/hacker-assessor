var data = require('../seniorities.json');
var seniorities = require("../models/seniorities");
var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://hackerassessor.sqlite3');
var query;

for (item in data) {
  item = data[item];

  query = seniorities.insert({
    name: item.name,
    skills: item.skills.join(",")
  }).toQuery();

  conn.query(query.text, query.values, function(error, result) {
    if (error) {
      console.dir(error);
    } else {
      console.dir(result);
    }
  });
}
