const express = require("express")
var Router = express.Router();
const mongoose = require("mongoose")
const path = require('path');
const l = require(path.resolve("src/Schema/") + "/Logs.js");
const Logs = l.Log;

Router.get("/", function(req, res) {
  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");
    Logs.findOne({
      name: req.user.username
    }, function(err, foundList) {
      res.render("user/logdetails", {
        ListTitle: foundList.name,
        newListItems: foundList.logdetails
      });
    })
  } catch (err) {
    res.redirect("/account/login");
  }
});
module.exports = Router;
