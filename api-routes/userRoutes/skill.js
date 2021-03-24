const express = require("express");
const Router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const {
  clearKey
} = require(path.resolve("src") + "/cache.js");
const Skill = require(path.resolve("src/Schema/") + "/Skill.js");

Router.get("/", async (req, res) => {
  let foundSkills = await Skill.find({}).cache();
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    res.render("admin/skills", {
      listofSkills: foundSkills
    });
  } catch (err) {
    res.render("guest/skills", {
      listofSkills: foundSkills
    });
  }
})
Router.post("/", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    var skill = {
      name: req.body.projectName,
      description: req.body.description,
      url: _.lowerCase(req.body.projectName)
    };
    try {
      await Skill.insertMany(skill);
      res.redirect("/skill");
    } catch (err) {
      res.send(400, err);
    }
  } catch (err) {
    res.redirect("/account");
  }
})

Router.get('/android', function(req, res) {
  res.render("guest/skill/android");
});
Router.get('/bigdata', function(req, res) {
  res.render('guest/skill/bigdata');
});
Router.get('/cyber-security', function(req, res) {
  res.render('guest/skill/cyber_security');
});
Router.get('/dbms', function(req, res) {
  res.render('guest/skill/dbms');
});
Router.get('/dl', function(req, res) {
  res.render('guest/skill/dl');
});
Router.get('/dsa', function(req, res) {
  res.render('guest/skill/dsa');
});
Router.get('/ml', function(req, res) {
  res.render('guest/skill/ml');
});
Router.get('/networking', function(req, res) {
  res.render('guest/skill/networking');
});
Router.get('/web-development', function(req, res) {
  res.render('guest/skill/web-development');
});
module.exports = Router;
