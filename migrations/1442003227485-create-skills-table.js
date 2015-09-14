var connection = require("../connection");
var skills = require("../models/skills");

connection().query(skills.create().toQuery().text, connection.logger);
