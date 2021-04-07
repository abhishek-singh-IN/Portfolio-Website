const mongoose = require("mongoose"),
  mysql = require("mysql"),
  path = require('path'),
  fs = require("fs"),
  mongo = process.env.MONGODB_HOST || "mongodb://" + process.env.MONGODB_LOCAL_USER + ":" + process.env.MONGODB_LOCAL_PASSWORD + "@" + process.env.MONGODB_LOCAL_HOST

const myMongoDBConnection = mongoose.connect(mongo + "/PortfolioDB" + "?authSource=admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function() {
  return console.log('MongoDB connected...');
}).catch(function(err) {
  return console.log(err);
});

module.exports = {
  mongoDBConnection: myMongoDBConnection
};
