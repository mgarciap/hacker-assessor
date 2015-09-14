var connection = require("../connection");
var seniorities = require("../models/seniorities");
var data = require('../data/json/seniorities.json');
var query;

for (item in data) {
  item = data[item];

  var list = [];
  item.requirements.forEach(function(requirement) {
    var piece = JSON.stringify(requirement).split(",");
    list = list.concat(piece);
  });

  query = seniorities.insert({
    name: item.name,
    requirements: list.join(",")
  }).toQuery();

  connection().query(query.text, query.values, connection.logger);
}
