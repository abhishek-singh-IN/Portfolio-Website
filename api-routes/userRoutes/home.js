var express = require("express");
var Router = express.Router();
var path = require('path');
var fs = require("fs");
var tooldetails, testimonaldetails;

fs.readFile(path.resolve("data/tool.json"), function (err, data) {
  if (err) throw err;
  tooldetails = JSON.parse(data);
});
fs.readFile(path.resolve("data/testimonals.json"), function (err, data) {
  if (err) throw err;
  testimonaldetails = JSON.parse(data);
});
Router.get("/", function (req, res) {
  res.render("pages/home", {
    listoftools: tooldetails.tool,
    listoftestimonals: testimonaldetails.testimonals
  });
});

module.exports = Router;