const express=require("express");
const Router=express.Router();
const bodyParser = require('body-parser');
const https = require('https')
var path=require('path');
require('dotenv').config()

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.post("/", function(req, res) {

  const content = req.body.search
  const url = "https://www.googleapis.com/customsearch/v1?key=" + process.env.googlesearchkey + "&cx=" + process.env.cx + "&q=" + content + "&callback=hndlr"

  https.get(url, function(resposne) {
    // console.log(resposne.statusCode);
  })

  res.render("search", {
    url: url
  });

})

module.exports=Router;
