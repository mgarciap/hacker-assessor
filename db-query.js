var connection = require("./connection");
var seniorities = require('./models/seniorities');
var hackers = require('./models/hackers');

exports.getSeniority = getOne(seniorities);
exports.getSeniorities = getAll(seniorities);
exports.getHacker = getOne(hackers);
exports.getHackers = getAll(hackers);

function getOne(model) {
  return function(id, callback) {
    var query = model
      .select(model.star())
      .where(model.id.equals(id))
      .toQuery();

    connection().query(query.text, query.values, callback);
  }
}

function getAll(model) {
  return function(callback) {
    var query = model
      .select(model.star())
      .toQuery();

    connection().query(query.text, callback);
  }
}
