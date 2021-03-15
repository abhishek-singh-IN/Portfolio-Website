const express = require("express");
const Router = express.Router();
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require(path.resolve("src/Schema/") + "/User.js");
const Contact = require(path.resolve("src/Schema/") + "/Contact.js");
const Chat = require(path.resolve("src/Schema/") + "/Chat.js");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.get("/", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/account/admin");
  } else {
    res.redirect("/account/login");
  }
});

Router.use("/auth", require("./authentication"+"/auth"))
Router.use("/admin", require("./authentication"+"/admin"));
Router.use("/todolist", require("./todolist"));


Router.get("/login", function(req, res) {
  res.render("pages/account/login");
});

Router.get("/register", function(req, res) {
  res.render("pages/account/register");
});

Router.get("/secrets", function(req, res) {

  if (req.isAuthenticated()) {
      User.find({
        "secret": {
          $ne: null
        }
      }, function(err, foundUsers) {
        if (err) {
          console.log(err);
        } else {
          if (foundUsers) {
            res.render("pages/account/secrets", {
              usersWithSecrets: foundUsers
            });
          }
        }
      });
  } else {
    res.redirect("/account/login");
  }
});

Router.get("/submit", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("pages/account/submit");
  } else {
    res.redirect("/account/login");
  }
});

Router.post("/submit", function(req, res) {
  const submittedSecret = req.body.secret;

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(function() {
          res.redirect("/account/secrets");
        });
      }
    }
  });
});

Router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/account");
});

module.exports = Router;
