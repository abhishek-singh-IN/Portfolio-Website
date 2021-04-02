const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const github =require(path.resolve("src/controller/github.js"));

Router.get("/",
  passport.authenticate('github', { scope: ['email']})
);

Router.get(
  "/secrets",
  passport.authenticate("github", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username,"github");
    var redirectTo = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  }
);

module.exports = Router;
