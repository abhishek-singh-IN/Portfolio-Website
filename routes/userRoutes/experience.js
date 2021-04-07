var express = require("express");
var Router = express.Router();
var mongoose = require("mongoose");
var path = require('path');
const {
  clearKey
} = require(path.resolve("src") + "/cache.js");

var Experience = require(path.resolve("src/Schema/") + "/Experience.js");

Router.get("/", async (req, res) => {
  let foundexperience = await Experience.find({}).cache();
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    res.render("admin/experience", {
      listofexperiences: foundexperience
    });
  } catch (err) {
    res.render("guest/experience", {
      listofexperiences: foundexperience
    });
  }
})

module.exports = Router;
