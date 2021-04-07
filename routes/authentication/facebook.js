const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const facebook = require(path.resolve("src/controller/facebook.js"));

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const User = userdetailschema.User;

Router.get("/",
  passport.authenticate('facebook', {
    scope: ['email']
  })
);

Router.get(
  "/secrets",
  passport.authenticate("facebook", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username, "facebook");
    var redirectTo = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  }
);

Router.get("/delete", function(req, res) {

  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");
    User.findOne({
      username: req.user.username
    }, function(err, founduser) {
      while (founduser.facebook.length) {
        founduser.facebook.pop();
      }
      founduser.save();
      res.redirect("/account/login");
    });
  } catch (err) {
    res.redirect("/account/login");
  }

});

module.exports = Router;
