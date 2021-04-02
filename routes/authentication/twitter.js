const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const twitter =require(path.resolve("src/controller/twitter.js"));

Router.get("/",
  passport.authenticate('twitter', { scope: ['email']})
);


Router.get(
  "/secrets",
  passport.authenticate("twitter", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username,"twitter");
    var redirectTo = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  }
);

module.exports = Router;
