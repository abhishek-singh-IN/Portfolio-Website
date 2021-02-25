var mongoose = require("mongoose");
var path = require('path');
var fs = require("fs");

fs.readFile(path.resolve("secrets/mongodb.json"), function (err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

  var myMongoDBConnection = mongoose.connect(details.mongodb_link, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    return console.log('MongoDB connected...');
  }).catch(function (err) {
    return console.log(err);
  });

  module.exports = myMongoDBConnection;
});