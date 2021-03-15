const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const amazon = require(path.resolve("src/controller/amazon.js"));

Router.get("/",
  passport.authenticate('amazon', {
    scope: ['email']
  })
);


Router.get(
  "/secrets",
  passport.authenticate("amazon", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username,"amazon");
    res.redirect("/account");
  }
);

module.exports = Router;
