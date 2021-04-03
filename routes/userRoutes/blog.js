var express = require("express");
var Router = express.Router();
var bodyParser = require('body-parser');
var https = require('https');
var _ = require("lodash");
var path = require('path');

const NewBlog = require(path.resolve("src/Schema") + "/Blog.js");
const Paragraph = NewBlog.Paragraph;
const Blog = NewBlog.Blog;

Router.use(bodyParser.urlencoded({
  extended: true
}));
var posts = [];

Router.get("/", async (req, res) => {
  let foundBloglist = await Blog.find({}).cache();
  try {
    res.render("guest/blog", {
      posts: foundBloglist
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

Router.get("/compose", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    res.render("admin/Blog_Compose");
  } catch (err) {
    res.redirect("/account/login");
  }
});

Router.post("/compose", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    var post = {
      date: new Date(),
      title: req.body.postTitle,
      content: req.body.postBody
    };
    Blog.insertMany(post, function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/blog/posts/" + req.body.postTitle + "/compose");
  } catch (err) {
    res.redirect("/blog");
  }
});

Router.get("/posts/:postName", async (req, res) => {
  if (req.isAuthenticated() && req.user.type == 'admin') {
    res.redirect("/blog/posts/" + req.params.postName + "/compose");
  } else {
    try {
      Blog.findOne({
        title: req.params.postName
      }, function(err, post) {
        if (post == null) {
          res.redirect("/blog");
        } else {
          res.render("guest/post", {
            title: post.title,
            content: post.content,
            paragraph: post.paragraph
          });
        }
      });
    } catch (err) {
      res.redirect("/blog");
    }
  }
});

Router.get("/posts/:postName" + "/compose", async (req, res) => {

  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    Blog.findOne({
      title: req.params.postName
    }, function(err, post) {
      if (post == null) {
        res.redirect("/blog");
      } else {
        res.render("admin/blog-subHeadings", {
          title: post.title,
          content: post.content,
          paragraph: post.paragraph
        });
      }
    });
  } catch (err) {
    res.redirect("/blog");
  }
});

Router.post("/posts/:postName" + "/compose", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    var subpost = {
      date: new Date(),
      title: req.body.postTitle,
      content: req.body.postBody
    };

    Blog.findOne({
      title: req.params.postName
    }, function(err, post) {
      if (post != null) {
        post.paragraph.push(subpost);
        post.save();
      }
    });

  } catch (err) {
    console.log(err);
  } finally {
    res.redirect("/blog/posts/" + req.params.postName + "/compose");
  }
});

module.exports = Router;
