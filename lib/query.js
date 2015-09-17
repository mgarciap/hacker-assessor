var connection = require("./connection");

exports.getOne = function(model, id, callback) {
  return function() {
    var query = model
      .select(model.star())
      .where(model.id.equals(id))
      .toQuery();

    connection().query(query.text, query.values, callback);
  }
}

exports.getAll = function(model, callback) {
  return function() {
    var query = model
      .select(model.star())
      .toQuery();

    connection().query(query.text, callback);
  }
}
