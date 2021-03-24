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
Router.use("/todolist", require("./account" + "/todolist"));
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
Router.get("/secrets", function(req, res) {
  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");
    User.find({
      "secret": {
        $ne: null
      }
    }, function(err, foundUsers) {
      if (!foundUsers) throw new Error("User not Found");
      res.render("user/secrets", {
        usersWithSecrets: foundUsers
      });
    });
  } catch (err) {
    res.redirect("/account/login");
  }
});
Router.get("/submit", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("user/submit");
  } else {
    res.redirect("/account/login");
  }
});
Router.post("/submit", function(req, res) {
  User.findById(req.user.id, function(err, foundUser) {
    try {
      foundUser.secret = req.body.secret;
      foundUser.save(function() {
        res.redirect("/account/secrets");
      });
    } catch (err) {
      console.log(req.user.id + " : " + err);
      res.redirect("/account");
    }
  });
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
    res.redirect("/account");
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
