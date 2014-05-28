var config =  require('../config');
var Mongodb = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

var server = new Server(config.host, Connection.DEFAULT_PORT, {});
module.exports = new Mongodb(config.soqudb, server);
