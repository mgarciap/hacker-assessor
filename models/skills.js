var sql = require('sql');

module.exports = sql.define({
  name: "skills",
  columns: [{
    name: 'id',
    dataType: 'integer',
    primaryKey: true
  }, {
    name: 'name',
    dataType: 'text',
  }, {
    name: 'description',
    dataType: 'text'
  }]
});
