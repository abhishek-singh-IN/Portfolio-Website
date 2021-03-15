const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const facebook =require(path.resolve("src/controller/facebook.js"));

Router.get("/",
  passport.authenticate('facebook', { scope: ['email']})
);


Router.get(
  "/secrets",
  passport.authenticate("facebook", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username,"facebook");
    res.redirect("/account");
  }
);

module.exports = Router;
