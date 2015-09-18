var connection = require("../connection");
var seniorities = require("../models/hackers");
var data = require('../data/json/hackers.json');
var query;

for (item in data) {
  query = seniorities.insert({
    name: data[item].name,
    skills: JSON.stringify(data[item].skills)
  }).toQuery();

  connection().query(query.text, query.values, connection.logger);
}
