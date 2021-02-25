var express = require("express");
var Router = express.Router();

Router.use(function (req, res) {
  res.render('templates/Error');
});

module.exports = Router;