const express = require("express"),
  Router = express.Router(),
  path = require('path'),
  passport = require("passport"),
  mongoose = require("mongoose"),
  findOrCreate = require('mongoose-findorcreate'),
  FacebookStrategy = require('passport-facebook').Strategy;

const log_update = require(path.resolve("src/") + "/log_update.js"),
  profile_update = require(path.resolve("src/") + "/profile_update.js");

const userdetailschema = require(path.resolve("src/Schema") + "/User.js"),
  User = userdetailschema.User,
  facebook = userdetailschema.Facebook;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_OAUTH_APP_ID,
    clientSecret: process.env.FACEBOOK_OAUTH_APP_SECRET,
    callbackURL: process.env.OAUTH_SUB_DOMAIN + process.env.FACEBOOK_OAUTH_APP_CALLBACK,
    profileFields: ["email", "name", 'id', 'displayName', 'gender', 'profileUrl', 'picture.type(large)']
  },
  async (accessToken, refreshToken, profile, cb) => {

    const tempProfile = new facebook({
      timestamp: new Date(),
      id: profile.id,
      displayName: profile.displayName,
      familyName: profile.name.familyName,
      givenName: profile.name.givenName,
      middleName: profile.name.middleName,
      emails: profile.emails,
      photos: profile.photos,
      gender: profile.gender
    });

    await User.findOrCreate({
      username: profile.emails[0].value
    }, function(err, founduser) {
      log_update(founduser._id, "facebook");
      try {
        const checkuser = founduser.facebook.slice().reverse();
        if (checkuser[0].id != profile.id ||
          checkuser[0].displayName != profile.displayName ||
          checkuser[0].familyName != profile.name.familyName ||
          checkuser[0].givenName != profile.name.givenName) {
          founduser.facebook.push(tempProfile);
        }
      } catch (error) {
        founduser.facebook.push(tempProfile);
      }
      profile_update(founduser, profile);
      return cb(err, founduser);
    });
  }));

Router.get("/",
  passport.authenticate('facebook', {
    scope: ['email']
  })
);

Router.get(
  "/secrets",
  passport.authenticate("facebook", {
    failureRedirect: "/login"
  }),
  function(req, res) {
    var redirectTo = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  }
);

Router.get("/delete", function(req, res) {

  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");
    User.findOne({
      username: req.user.username
    }, function(err, founduser) {
      while (founduser.facebook.length) {
        founduser.facebook.pop();
      }
      founduser.save();
      res.redirect("/account/login");
    });
  } catch (err) {
    res.redirect("/account/login");
  }

});

module.exports = Router;
