var connection = require("../connection");
var skills = require("../models/skills");
var csvParser = require('csv-parse');
var readGlob = require('read-glob');
var query;

readGlob('**/*.csv', 'utf8', function(error, contents) {
  if (error) {
    throw error;
  } else {
    contents.forEach(function(content) {
      csvParser(content, function(error, output) {
        if (error) {
          throw error;
        } else {
          extractSkills(output).forEach(function(skill) {
            var query = skills.insert(skill).toQuery();
            connection().query(query.text, query.values, connection.logger);
          });
        }
      });
    });
  }
});

function extractSkills(rows) {
  var skills = [];

  rows.forEach(function(row, index) {
    row.forEach(function(column, index) {
      if (!index) {
        skills.push({
          name: column
        });
      }
    });
  });

  return skills.filter(function(skill) {
    return !!skill.name;
  });
}
