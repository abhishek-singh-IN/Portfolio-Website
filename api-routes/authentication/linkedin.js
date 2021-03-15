const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const linkedin =require(path.resolve("src/controller/linkedin.js"));

Router.get("/",
  passport.authenticate('linkedin', { scope: ['email']})
);


Router.get(
  "/secrets",
  passport.authenticate("linkedin", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username,"linkedin");
    res.redirect("/account");
  }
);

module.exports = Router;
