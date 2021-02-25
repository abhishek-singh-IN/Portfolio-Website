var mysql = require("mysql");
var path = require('path');
var fs = require("fs");

fs.readFile(path.resolve("secrets/mysql.json"), function (err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

  var mysqlConnection = mysql.createConnection({
    host: details.mysql_host,
    user: details.mysql_user,
    password: details.mysql_password,
    database: details.mysql_database,
    multipleStatement: true
  });

  mysqlConnection.connect(function (err) {
    if (!err) {
      console.log("Connected MySQL Database");
    } else {
      console.log("Connection failed to MYSQL");
    }
  });

  module.exports = mysqlConnection;
});