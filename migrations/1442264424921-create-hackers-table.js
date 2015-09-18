var connection = require("../connection");
var hackers = require("../models/hackers");

connection().query(hackers.create().toQuery().text, connection.logger);
