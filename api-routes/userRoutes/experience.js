var express = require("express");
var Router = express.Router();
var mongoose = require("mongoose");
var path = require('path');
var ExperienceSchema = {
  company_name: String,
  duration: String,
  profile: String,
  description: String,
  link: String
};
var Experience = mongoose.model("Experience", ExperienceSchema);

Router.get('/', function (req, res) {

  Experience.find({}, function (err, foundProjects) {
    res.render("pages/experience", {
      listofexperiences: foundProjects
    });
  });
});

module.exports = Router;