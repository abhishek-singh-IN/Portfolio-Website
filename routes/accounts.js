const express = require("express");
const Router = express.Router();
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const User = userdetailschema.User;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

Router.use("/auth/google", require("./authentication" + "/google"));
Router.use("/auth/facebook", require("./authentication" + "/facebook"));
Router.use("/auth/microsoft", require("./authentication" + "/microsoft"));
Router.use("/auth/github", require("./authentication" + "/github"));
// Router.use("/auth/local", require("./authentication" + "/local"));

Router.use("/admin", require("./account" + "/admin"));

Router.use("/logs", require("./account" + "/logsdataview"));

Router.use(bodyParser.urlencoded({
  extended: true
}));
Router.get("/", function(req, res) {
  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");
    res.render("admin/account", {
      userdetails: req.user
    });
  } catch (err) {
    res.redirect("/account/login");
  }
});
Router.get("/login", function(req, res) {
  try {
    res.render("user/login");
  } catch (e) {
    res.redirect("/");
  }
});
Router.get("/register", function(req, res) {
  try {
    res.render("user/register");
  } catch (e) {
    res.redirect("/");
  }
});

Router.get("/logout", function(req, res) {
  try {
    req.logout();
    res.redirect("/account");
  } catch (err) {
    console.log(err);
    res.redirect("/")
  }
});
Router.get("/profile", function(req, res) {
  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");
    res.render("admin/profile", {
      user: req.user
    });
  } catch (err) {
    req.session.redirectTo = "/account/profile";
    res.redirect("/account/login");
  }
})
Router.get("/profile/:customListName" + "/log", function(req, res) {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    Logs.findOne({
      _id: req.params.customListName
    }, function(err, foundList) {
      res.render("user/logdetails", {
        ListTitle: foundList.name,
        newListItems: foundList.logdetails
      });
    })
  } catch (err) {
    res.redirect("/account");
  }
});
module.exports = Router;
