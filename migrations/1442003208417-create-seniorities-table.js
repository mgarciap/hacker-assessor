var connection = require("../connection");
var seniorities = require("../models/seniorities");

connection().query(seniorities.create().toQuery().text, connection.logger);
