var express = require("express");
var Router = express.Router();

Router.get('/', function (req, res) {
    res.render("guest/Gallery");
});

module.exports = Router;
