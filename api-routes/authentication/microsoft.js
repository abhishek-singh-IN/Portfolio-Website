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
    res.redirect("/account");
  });

module.exports = Router;
