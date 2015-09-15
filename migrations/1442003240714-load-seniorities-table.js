var connection = require("../connection");
var seniorities = require("../models/seniorities");
var data = require('../data/json/seniorities.json');
var query;

for (item in data) {
  query = seniorities.insert({
    name: data[item].name,
    requirements: JSON.stringify(data[item].requirements)
  }).toQuery();

  connection().query(query.text, query.values, connection.logger);
}
