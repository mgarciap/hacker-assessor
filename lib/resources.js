var query = require('./query');
var seniorities = require('../models/seniorities');
var hackers = require('../models/hackers');

exports.getSeniority = function(id, getSeniorityCallback) {
  query.getOne(seniorities, id, function(error, result) {
    /**
     * TODO: This should change in the near future since entity properties
     * should NOT be stored all together as a string inside a single db column.
     */
    result.rows[0].requirements = JSON.parse(result.rows[0].requirements);

    getSeniorityCallback(result);
  })();
};

exports.getSeniorities = function(getSenioritiesCallback) {
  query.getAll(seniorities, function(error, result) {
    getSenioritiesCallback(result);
  })();
};

exports.getHacker = function(id, getHackerCallback) {
  query.getOne(hackers, id, function(error, result) {
    /**
     * TODO: This should change in the near future since entity properties
     * should NOT be stored all together as a string inside a single db column.
     */
    result.rows[0].skills = JSON.parse(result.rows[0].skills);

    getHackerCallback(result);
  })();
};

exports.getHackers = function(getHackersCallback) {
  query.getAll(hackers, function(error, result) {
    getHackersCallback(result);
  })();
};
