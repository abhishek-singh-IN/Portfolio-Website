const express = require("express")
var Router = express.Router();
const mongoose = require("mongoose")
const path = require('path');
const l = require(path.resolve("src/Schema/") + "/Logs.js");
const Logs=l.Log;

Router.get("/", function(req, res) {

  if (req.isAuthenticated()) {
    Logs.findOne({
      name: req.user.username
    }, function(err, foundList) {
        res.render("pages/logdetails", {
          ListTitle: foundList.name,
          newListItems: foundList.logdetails
        });
    })
  } else {
    res.redirect("/account/login");
  }
});
module.exports = Router;
