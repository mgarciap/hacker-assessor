var sql = require('sql');

module.exports = sql.define({
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
});
