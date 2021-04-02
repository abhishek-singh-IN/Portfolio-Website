const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const microsoft =require(path.resolve("src/controller/microsoft.js"));

Router.get("/",
  passport.authenticate('microsoft', {
    scope: ["openid","email", "profile"]
  })
);

Router.get("/secrets",
  passport.authenticate('microsoft', {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username,"microsoft");
    var redirectTo = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  });

module.exports = Router;
