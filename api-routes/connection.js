const mongoose = require("mongoose");
const mysql = require("mysql");
const path = require('path');
const fs = require("fs");

var myMongoDBConnection,mysqlConnection;

fs.readFile(path.resolve("secrets/mongodb.json"), function (err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

   myMongoDBConnection = mongoose.connect(details.mongodb_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    return console.log('MongoDB connected...');
  }).catch(function (err) {
    return console.log(err);
  });
});

// fs.readFile(path.resolve("secrets/mysql.json"), function (err, data) {
//   if (err) throw err;
//   var details = JSON.parse(data);
//
//   mysqlConnection = mysql.createConnection({
//     host: details.mysql_host,
//     user: details.mysql_user,
//     password: details.mysql_password,
//     database: details.mysql_database,
//     multipleStatement: true
//   });
//
//   mysqlConnection.connect(function (err) {
//     if (!err) {
//       console.log("Connected MySQL Database");
//     } else {
//       console.log("Connection failed to MYSQL");
//     }
//   });
// });

module.exports = {
    mongoDBConnection: myMongoDBConnection
    // sqlConnection: mysqlConnection
};
