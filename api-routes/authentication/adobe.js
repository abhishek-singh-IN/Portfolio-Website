const express = require("express");
var Router = express.Router();
var path = require('path');
const passport = require("passport");
const logs = require(path.resolve("src/") + "/logs.js");
const adobe =require(path.resolve("src/controller/adobe.js"));

Router.get("/",
  passport.authenticate('adobe')
);


Router.get(
  "/secrets",
  passport.authenticate("adobe", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    logs.insertlog(req.user.username,"adobe");
    res.redirect("/account");
  }
);

module.exports = Router;
