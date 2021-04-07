const express = require("express");
const Router = express.Router();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const User = userdetailschema.User;

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.get("/", function(req, res) {
  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");
    User.find({
      "secret": {
        $ne: null
      }
    }, function(err, foundUsers) {
      if (!foundUsers) throw new Error("User not Found");
      res.render("user/secrets", {
        usersWithSecrets: foundUsers
      });
    });
  } catch (err) {
    req.session.redirectTo = "/application/secrets";
    res.redirect("/account/login");
  }
});
Router.get("/submit", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("user/submit");
  } else {
    res.redirect("/account/login");
  }
});
Router.post("/submit", function(req, res) {
  User.findById(req.user.id, function(err, foundUser) {
    try {
      foundUser.secret = req.body.secret;
      foundUser.save(function() {
        res.redirect("/application/secrets");
      });
    } catch (err) {
      console.log(req.user.id + " : " + err);
      res.redirect("/account");
    }
  });
});
module.exports = Router;
