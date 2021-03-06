const express = require("express");
const Router = express.Router();
const path = require('path');
const bodyParser = require("body-parser");
const _ = require("lodash");

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const l = require(path.resolve("src/Schema/") + "/Logs.js");
const Logs = l.Log;
const User = userdetailschema.User;
const Contact = require(path.resolve("src/Schema/") + "/Contact.js");
const Chat = require(path.resolve("src/Schema/") + "/Chat.js");

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.use("/user-details", require("./user"));

Router.get("/user", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    User.find({}, function(err, foundUsers) {
      res.render("admin/user", {
        userlist: foundUsers
      });
    });
  } catch (err) {
    res.redirect("/account");
  }
})
Router.post("/user", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    if (req.isAuthenticated()) {

      if (req.body.Button == "profile") {
        User.findOne({
          username: req.body.username
        }, function(err, foundList) {
          if (foundList == null) res.redirect("/account/admin/user");
          else res.redirect("/account/admin/user-details/" + foundList._id + "/profile");
        });
      }
      if (req.body.Button == "delete") {
        User.deleteOne({
          username: req.body.username
        }, function(err) {
          if (err) return handleError(err);
          res.redirect("/account/admin/user");
        });
      }
      if (req.body.Button == "admin") {
        User.findOne({
          username: req.body.username
        }, function(err, foundList) {
          foundList.type = "admin";
          foundList.save();
        })
        res.redirect("/account/admin/user");
      }
      if (req.body.Button == "standard") {
        User.findOne({
          username: req.body.username
        }, function(err, foundList) {
          foundList.type = "Standard";
          foundList.save();
        })
        res.redirect("/account/admin/user");
      }
      if (req.body.Button == "log") {
        Logs.findOne({
          name: req.body.username
        }, function(err, foundList) {
          if (foundList == null) res.redirect("/account/admin/user");
          else res.redirect("/account/admin/user-details/" + foundList._id + "/log?page=1&limit=15");
        });
      }
    }
  } catch (err) {
    res.redirect("/account/admin/user");
  }
});
Router.get("/contact", async (req, res) => {
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
Router.get("/chat", async (req, res) => {
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
