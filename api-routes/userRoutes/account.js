const express = require("express");
var Router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
var path = require('path');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

Router.use(passport.initialize());
Router.use(passport.session());

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  googleId: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var fs = require("fs");

fs.readFile(path.resolve("secrets/google-auth.json"), function(err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

  passport.use(new GoogleStrategy({
      clientID: details.client_id,
      clientSecret: details.client_secret,
      callbackURL: "http://localhost:3000/account/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {

      User.findOrCreate({
        googleId: profile.id
      }, function(err, user) {
        return cb(err, user);
      });
    }
  ));
});

Router.get("/", function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/account/secrets");
  } else {
    res.redirect("/account/login");
  }
});

Router.get("/auth/google",
  passport.authenticate('google', {
    scope: ["profile"]
  })
);

Router.get("/auth/google/secrets",
  passport.authenticate('google', {
    failureRedirect: "/login"
  }),
  function(req, res) {
    res.redirect("/account/secrets");
  });

Router.get("/login", function(req, res) {
  res.render("pages/account/login");
});

Router.get("/register", function(req, res) {
  res.render("pages/account/register");
});

Router.get("/secrets", function(req, res) {
  User.find({
    "secret": {
      $ne: null
    }
  }, function(err, foundUsers) {
    if (err) {
      console.log(err);
    } else {
      if (foundUsers) {
        res.render("pages/account/secrets", {
          usersWithSecrets: foundUsers
        });
      }
    }
  });
});

Router.get("/submit", function(req, res) {
  if (req.isAuthenticated()) {
    res.render("pages/account/submit");
  } else {
    res.redirect("/account/login");
  }
});

Router.post("/submit", function(req, res) {
  const submittedSecret = req.body.secret;

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.secret = submittedSecret;
        foundUser.save(function() {
          res.redirect("/account/secrets");
        });
      }
    }
  });
});

Router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/account");
});

Router.post("/register", function(req, res) {

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      res.redirect("/account/register");
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/account/secrets");
      });
    }
  });

});

Router.post("/login", function(req, res) {

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/account/secrets");
      });
    }
  });

});

module.exports = Router;
