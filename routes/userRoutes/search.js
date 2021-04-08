var express = require("express");
var Router = express.Router();
var bodyParser = require('body-parser');

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.post("/", function(req, res) {

  var content = req.body.search;
  var url = "https://www.googleapis.com/customsearch/v1?key=" + process.env.GOOGLE_SEARCH_KEY + "&cx=" + process.env.GOOGLE_SEARCH_CX + "&q=" + content + "&callback=hndlr";
  res.render("guest/search", {
    url: url
  });

});

module.exports = Router;
