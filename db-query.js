var connection = require("./connection");
var seniorities = require('./models/seniorities');

exports.getSeniority = function(name, callback) {
  var query = seniorities
    .select(seniorities.star())
    .where(seniorities.name.equals(name))
    .toQuery();

  connection().query(query.text, query.values, callback);
}
