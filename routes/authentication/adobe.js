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
    var redirectTo = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  }
);

module.exports = Router;
