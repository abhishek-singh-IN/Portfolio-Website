var myMongoDBConnection = require("./mongodb");
var mysqlConnection = require("./mysql");

module.exports = {
    mongoDBConnection: myMongoDBConnection,
    sqlConnection: mysqlConnection
};