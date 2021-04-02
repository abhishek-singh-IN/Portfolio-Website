var express = require("express");
var Router = express.Router();

Router.get('/', function (req, res) {
  try{
    res.render("guest/About");
  }catch(err){
    console.log(err);
    res.redirect("/")
  }
});

module.exports = Router;
