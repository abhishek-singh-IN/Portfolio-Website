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

Router.get("/", function(req, res) {
  try {
    res.render("guest/blog", {
      startingContent: "Testing the Blog Page",
      posts: posts
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

Router.get("/compose", function(req, res) {
  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");
    res.render("user/Blog_Compose");
  } catch (err) {
    res.redirect("/account/login");
  }
});

Router.post("/compose", function(req, res) {
  try {
    var post = {
      title: req.body.postTitle,
      content: req.body.postBody
    };
    posts.push(post);
  } catch (err) {
    console.log(err);
  } finally {
    res.redirect("/blog");
  }
});

Router.get("/posts/:postName", function(req, res) {
  try {
    var requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post) {
      var storedTitle = _.lowerCase(post.title);

      if (storedTitle === requestedTitle) {
        res.render("guest/post", {
          title: post.title,
          content: post.content
        });
      }
    });
  } catch (err) {
    res.redirect("/blog");
  }
});

module.exports = Router;
