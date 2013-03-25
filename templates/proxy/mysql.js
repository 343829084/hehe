var easymysql = require('easymysql');

var config = require('../config');
var mysqlConf = config.mysql;

var mysql = easymysql.create({
  'maxconnections': mysqlConf.maxConnection
});

mysqlConf.servers.forEach(function (server) {
  mysql.addserver(server);
});

mysql.on('busy', function (queuesize, maxconnections, which) {
  // XXX: write log and monitor it
});

module.exports = mysql;
