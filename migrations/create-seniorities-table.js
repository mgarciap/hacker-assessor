var seniorities = require("../models/seniorities");
var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://hackerassessor.sqlite3');
var query = seniorities.create().toQuery();

conn.query(query.text, function(error, result) {
  if (error) {
    console.dir(error);
  } else {
    console.dir(result);
  }
});
