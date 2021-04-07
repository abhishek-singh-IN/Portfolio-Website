var express = require("express");
var Router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var alert = require('alert');
var path = require('path');
var Contact = require(path.resolve("src/Schema/") + "/Contact.js");

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.get("/", function(req, res) {
  try {
    res.render("guest/contact");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});
Router.post("/", function(req, res) {
  try {
    var contact = {
      timestamp: new Date(),
      name: req.body.contactName,
      email: req.body.contactMail,
      telephone: req.body.contactNo,
      message: req.body.contactMessage
    };
    Contact.insertMany(contact, function(err) {
      if (err) {
        console.log(err);
      }
    });
    alert("Submitted");
  } catch (err) {
    console.log(err);
  } finally {
    res.redirect("/Contact");
  }
});
module.exports = Router;
