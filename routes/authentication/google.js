const express = require("express"),
  Router = express.Router(),
  path = require('path'),
  mongoose = require("mongoose"),
  findOrCreate = require('mongoose-findorcreate'),
  passport = require("passport"),
  GoogleStrategy = require('passport-google-oauth20').Strategy

const userdetailschema = require(path.resolve("src/Schema") + "/User.js"),
  Google = userdetailschema.Google,
  User = userdetailschema.User;

const log_update = require(path.resolve("src/") + "/log_update.js"),
  profile_update = require(path.resolve("src/") + "/profile_update.js");

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT__SECRET,
    callbackURL: process.env.OAUTH_SUB_DOMAIN + process.env.GOOGLE_OAUTH_CALLBACK,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  async (accessToken, refreshToken, profile, cb) => {

    const tempProfile = new Google({
      timestamp: new Date(),
      id: profile.id,
      email: profile._json.email,
      displayName: profile.displayName,
      familyName: profile.name.familyName,
      givenName: profile.name.givenName,
      emails: profile.emails,
      photos: profile.photos,
      locale: profile._json.locale,
    });

    await User.findOrCreate({
      username: tempProfile.email
    }, async (err, founduser) => {
      log_update(founduser._id, "google");
      try {
        const checkuser = founduser.google.slice().reverse();
        if (checkuser[0].id != profile.id ||
          checkuser[0].email != profile._json.email ||
          checkuser[0].displayName != profile.displayName ||
          checkuser[0].familyName != profile.name.familyName ||
          checkuser[0].givenName != profile.name.givenName ||
          checkuser[0].locale != profile._json.locale) {
          founduser.google.push(tempProfile);
        }
      } catch (Error) {
        founduser.google.push(tempProfile);
      }
      profile_update(founduser, profile);
      return cb(err, founduser);
    });
  }));


Router.get("/",
  passport.authenticate('google', {
    scope: ["profile", "email"]
  })
);

Router.get("/secrets",
  passport.authenticate('google', {
    failureRedirect: "/login"
  }),
  function(req, res) {
    var redirectTo = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  });

module.exports = Router;
