const express=require("express");
const Router=express.Router();
const bodyParser = require('body-parser');
const https = require('https')
const _ = require("lodash")
var path=require('path');

var posts = [];
Router.get("/", function(req, res) {
  res.render("blog", {
    startingContent: "Testing the Blog Page",
    posts: posts
  });
})
Router.get("/compose", function(req, res) {
  res.render("compose");
})
Router.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/blog");
});
Router.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

  res.redirect("/");
})

module.exports=Router;
