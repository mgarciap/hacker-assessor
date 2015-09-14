var db = require('./db-query');
var respond = require('./response');
var utils = require('./utils');

/**
 * Retrieve a named seniority from the database.
 * @param {string} name A seniority name to be retrieved from the database.
 * @param {getSeniorityCallback} callback A callback to work with the successful query result.
 *
 * @callback getSeniorityCallback
 * @param {object} error An error object.
 * @param {object} result The successful query result.
 */
exports.pathSeniority = function(name, req, res) {
  db.getSeniority(name, function(error, result) {
    respond.make(req, res, utils.hackerNeededSkills(result.rows[0]), 'hacker.html.ejs');
  });
}
