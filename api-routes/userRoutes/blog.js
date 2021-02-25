var express = require("express");
var Router = express.Router();
var bodyParser = require('body-parser');
var https = require('https');
var _ = require("lodash");
var path = require('path');

Router.use(bodyParser.urlencoded({
  extended: true
}));
var posts = [];
Router.get("/", function (req, res) {
  res.render("pages/blog", {
    startingContent: "Testing the Blog Page",
    posts: posts
  });
});
Router.get("/compose", function (req, res) {
  res.render("pages/compose");
});
Router.post("/compose", function (req, res) {
  var post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/blog");
});
Router.get("/posts/:postName", function (req, res) {
  var requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    var storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("pages/post", {
        title: post.title,
        content: post.content
      });
    }
  });

  res.redirect("/");
});

module.exports = Router;