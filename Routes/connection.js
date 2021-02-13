const mysql = require("mysql")
const mongoose = require("mongoose")
require('dotenv').config({path:__dirname+'/../variables.env'})

const myMongoDBConnection = mongoose.connect(process.env.mongodb_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const mysqlConnection = mysql.createConnection({
  host: process.env.mysql_host,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
  multipleStatement: true
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected MySQL Database");
  } else {
    console.log("Connection failed to MYSQL");
  }
})

module.exports = {
    mongoDBConnection: myMongoDBConnection,
    sqlConnection: mysqlConnection,
};
