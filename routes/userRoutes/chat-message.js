var express = require("express");
var Router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var alert = require('alert');
var path = require('path');
var Chat = require(path.resolve("src/Schema/") + "/Chat.js");

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.post("/", function(req, res) {
  try {
    var chat = {
      timestamp: new Date(),
      email: req.body.contactMail,
      message: req.body.msg
    };
    Chat.insertMany(chat, function(err) {
      if (err) {
        console.log(err);
      }
    });
    alert("Sent Message Successfully");
  } catch (err) {

  } finally {
    res.redirect("/");
  }
});
module.exports = Router;
