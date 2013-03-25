var mysql = require('./mysql');

exports.getUsers = function (callback) {
  mysql.query('select User from mysql.user limit 1', callback);
};
