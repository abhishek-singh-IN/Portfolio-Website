const express = require("express");
var Router = express.Router();
var path = require('path');
var _ = require("lodash");
const User = require(path.resolve("src/Schema/") + "/User.js");
var Contact = require(path.resolve("src/Schema/") + "/Contact.js");
var Chat = require(path.resolve("src/Schema/") + "/Chat.js");
var Project = require(path.resolve("src/Schema/")+"/Project.js");
var Skill = require(path.resolve("src/Schema/")+"/Skill.js");

Router.get("/", function(req, res) {

  if (req.isAuthenticated()) {
    res.render("admin/account-section", {
      userdetails: req.user
    });
  } else {
    res.redirect("/account/login");
  }
});

Router.get("/profile", function(req, res) {
  if (req.isAuthenticated()) {
      res.render("admin/profile", {user: req.user});
  } else {
    res.redirect("/account");
  }
})

Router.get("/project", function(req, res) {
  if (req.isAuthenticated() && req.user.type === 'admin') {
    Project.find({}, function (err, foundProjects) {
      res.render("admin/project", {
        listofprojects: foundProjects
      });
    });
  } else {
    res.redirect("/Project");
  }
})

Router.post("/project", function(req, res) {
  if (req.isAuthenticated() && req.user.type === 'admin') {

    var project = {
      year:req.body.projectTimeline,
      title:req.body.projectName,
      technology:req.body.technologyStack,
      projectDiscription1:req.body.description1,
      projectDiscription2:req.body.description2,
      link:_.lowerCase(req.body.projectName)
    };
    Project.insertMany(project, function (err) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/account/admin/project");

  } else {
    res.redirect("/account");
  }
})
Router.get("/skill", function(req, res) {
  if (req.isAuthenticated() && req.user.type === 'admin') {
    Skill.find({}, function (err, foundSkills) {
        res.render("admin/skills", {
            listofSkills: foundSkills
        });
    });
  } else {
    res.redirect("/Skill");
  }
})
Router.post("/skill", function(req, res) {
  if (req.isAuthenticated() && req.user.type === 'admin') {

    var skill = {
      name:req.body.projectName,
      description:req.body.description,
      url:_.lowerCase(req.body.projectName)
    };
    Skill.insertMany(skill, function (err) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/account/admin/skill");

  } else {
    res.redirect("/account");
  }
})
Router.use("/logs", require("../logsdataview"));
Router.get("/secrets", function(req, res) {
    res.redirect("/account/secrets");
});

Router.get("/contact", function(req, res) {
  if (req.isAuthenticated() && req.user.type === 'admin') {
    Contact.find({}, function(err, foundContacts) {
      res.render("admin/contact", {
        listofmessages: foundContacts
      });
    });
  } else {
    res.redirect("/account/login");
  }
});

Router.get("/chat", function(req, res) {
  if (req.isAuthenticated() && req.user.type === 'admin') {
    Chat.find({}, function(err, foundChats) {
      res.render("admin/chat", {
        listofmessages: foundChats
      });
    });
  } else {
    res.redirect("/");
  }
});

module.exports = Router;
