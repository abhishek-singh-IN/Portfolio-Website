const express = require("express"),
  Router = express.Router(),
  mongoose = require("mongoose"),
  findOrCreate = require('mongoose-findorcreate'),
  passport = require("passport"),
  MicrosoftStrategy = require('passport-microsoft').Strategy,
  path = require('path');

const userdetailschema = require(path.resolve("src/Schema") + "/User.js"),
  microsoft = userdetailschema.Microsoft,
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

passport.use(new MicrosoftStrategy({
    clientID: process.env.MICROSOFT_OAUTH_APPLICATION_ID,
    clientSecret: process.env.MICROSOFT_OAUTH_CLIENT__SECRET,
    callbackURL: process.env.OAUTH_SUB_DOMAIN + process.env.MICROSOFT_OAUTH_CALLBACK,
    userProfileURL: "https://graph.microsoft.com/User.Read"
  },
  async (accessToken, refreshToken, profile, cb) => {

    const tempProfile = new microsoft({
      timestamp: new Date(),
      id: profile.id,
      displayName: profile.displayName,
      userPrincipalName: profile._json.userPrincipalName,
      familyName: profile.name.familyName,
      givenName: profile.name.givenName,
      emails: profile.emails,
      businessPhones: profile._json.businessPhones,
      jobTitle: profile._json.jobTitle,
      mobilePhone: profile._json.mobilePhone,
      officeLocation: profile._json.officeLocation,
      preferredLanguage: profile._json.preferredLanguage
    });
    await User.findOrCreate({
      username: tempProfile.emails[0].value
    }, async (err, founduser) => {
      log_update(founduser._id, "microsoft");
      try {
        const checkuser = founduser.microsoft.slice().reverse();
        if (checkuser[0].id != profile.id ||
          checkuser[0].displayName != profile.displayName ||
          checkuser[0].userPrincipalName != profile._json.userPrincipalName ||
          checkuser[0].familyName != profile.name.familyName ||
          checkuser[0].givenName != profile.name.givenName ||
          checkuser[0].jobTitle != profile._json.jobTitle ||
          checkuser[0].mobilePhone != profile._json.mobilePhone ||
          checkuser[0].officeLocation != profile._json.officeLocation ||
          checkuser[0].preferredLanguage != profile._json.preferredLanguage) {
          founduser.microsoft.push(tempProfile);
        }
      } catch (err) {
        founduser.microsoft.push(tempProfile);
      }
      profile_update(founduser, profile);
      return cb(err, founduser);
    });
  }));

Router.get("/",
  passport.authenticate('microsoft', {
    scope: ["openid", "email", "profile"]
  })
);

Router.get("/secrets",
  passport.authenticate('microsoft', {
    failureRedirect: "/login"
  }),
  function(req, res) {
    var redirectTo = req.session.redirectTo || '/account';
    delete req.session.redirectTo;
    res.redirect(redirectTo);
  });

module.exports = Router;
