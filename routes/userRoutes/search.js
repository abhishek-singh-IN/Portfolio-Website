var express = require("express");
var Router = express.Router();
var bodyParser = require('body-parser');
var https = require('https');
var path = require('path');

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.post("/", function (req, res) {

  var content = req.body.search;

  var fs = require("fs");

  fs.readFile(path.resolve("secrets/google-search.json"), function (err, data) {
    if (err) throw err;
    var details = JSON.parse(data);
    var url = "https://www.googleapis.com/customsearch/v1?key=" + details.googlesearchkey + "&cx=" + details.cx + "&q=" + content + "&callback=hndlr";

    res.render("guest/search", {
      url: url
    });
  });
});

module.exports = Router;
