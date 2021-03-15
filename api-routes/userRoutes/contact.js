var express = require("express");
var Router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var alert = require('alert');
var path=require('path');
var Contact = require(path.resolve("src/Schema/")+"/Contact.js");

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.get("/", function (req, res) {
  res.render("pages/contact");
});
Router.post("/", function (req, res) {
  var contact = {
    name: req.body.contactName,
    email: req.body.contactMail,
    telephone: req.body.contactNo,
    message: req.body.contactMessage
  };
  Contact.insertMany(contact, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/Contact");
  alert("Submitted");
});
module.exports = Router;
