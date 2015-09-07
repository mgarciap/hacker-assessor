var sql = require('sql');
var anyDB = require('any-db');
var conn = anyDB.createConnection('sqlite3://hackerassessor.sqlite3');

var table = {
  seniorities: sql.define({
    name: "seniorities",
    columns: [{
      name: 'id',
      dataType: 'integer',
      primaryKey: true
    }, {
      name: 'name',
      dataType: 'text',
    }, {
      name: 'skills',
      dataType: 'text'
    }]
  })
};

var query = table.seniorities.create().toQuery();

conn.query(query.text, function(error, result) {
  if (error) {
    console.dir(error);
  } else {
    console.dir(result);
  }
});
