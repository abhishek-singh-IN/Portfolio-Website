const express = require("express");
const Router = express.Router();
const path = require('path');
const bodyParser = require("body-parser");
const _ = require("lodash");

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const l = require(path.resolve("src/Schema/") + "/Logs.js");
const Logs = l.Log;

// Importing Schemas
const User = userdetailschema.User;
const Contact = require(path.resolve("src/Schema/") + "/Contact.js");
const Chat = require(path.resolve("src/Schema/") + "/Chat.js");
const Skill = require(path.resolve("src/Schema/") + "/Skill.js");
const Experience = require(path.resolve("src/Schema/") + "/Experience.js");

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.get("/user", function(req, res) {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    User.find({}, function(err, foundUsers) {
      res.render("admin/user", {
        userlist: foundUsers
      });
    });
  } catch (err) {
    console.log(err);
    res.redirect("/account");
  }
})
Router.post("/user", function(req, res) {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    if (req.isAuthenticated()) {

      if (req.body.Button == "profile") {
        Logs.findOne({
          name: req.body.username
        }, function(err, foundList) {
          // res.redirect("/account/profile/"+foundList._id+"/profile");
        });
      }
      if (req.body.Button == "delete") {
        User.deleteOne({
          username: req.body.username
        }, function(err) {
          if (err) return handleError(err);
        });
      }
      if (req.body.Button == "admin") {
        User.findOne({
          username: req.body.username
        }, function(err, foundList) {
          foundList.type = "admin";
          foundList.save();
        })
      }
      if (req.body.Button == "standard") {
        User.findOne({
          username: req.body.username
        }, function(err, foundList) {
          foundList.type = "Standard";
          foundList.save();
        })
      }
      if (req.body.Button == "log") {
        Logs.findOne({
          name: req.body.username
        }, function(err, foundList) {
          // res.redirect("/account/profile/"+foundList._id+"/log");
        });
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    res.redirect("/account/admin/user");
  }
});
Router.get("/contact", function(req, res) {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    Contact.find({}, function(err, foundContacts) {
      res.render("admin/contact", {
        listofmessages: foundContacts
      });
    });
  } catch (err) {
    res.redirect("/account/login");
  }
});
Router.get("/chat", function(req, res) {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised")
    Chat.find({}, function(err, foundChats) {
      res.render("admin/chat", {
        listofmessages: foundChats
      });
    });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = Router;
