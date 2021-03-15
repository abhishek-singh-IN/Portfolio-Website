const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const google =require(path.resolve("src/controller/google.js"));

Router.get("/",
  passport.authenticate('google', {
    scope: ["profile","email"]
  })
);

Router.get("/secrets",
  passport.authenticate('google', {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username,"google");
    res.redirect("/account");
  });

module.exports = Router;
