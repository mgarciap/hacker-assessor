var connection = require("../connection");
var seniorities = require("../models/seniorities");
var data = require('../seniorities.json');
var query;

for (item in data) {
  item = data[item];

  query = seniorities.insert({
    name: item.name,
    skills: item.skills.join(",")
  }).toQuery();

  connection().query(query.text, query.values, connection.logger);
}
