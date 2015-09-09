/**
 * @module connection
 * @description Create and return a database connection.
 * @example  See any-db https://www.npmjs.com/package/any-db for details about how to use their API.
 * var conn = require('connection');
 * conn().query({string} An sql statement., conn.logger);
 */

var anyDB = require('any-db');
var openConnection;

connection.logger = logger;

module.exports = connection;

function connection() {
  if (openConnection === undefined) {
    openConnection = anyDB.createConnection('sqlite3://hackerassessor.sqlite3');
  }
  return openConnection;
}

function logger(error, result) {
  if (error) {
    console.error(error);
  } else {
    console.dir(result);
  }
}
