const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var path = require('path');

const User = require(path.resolve("src/Schema/") + "/User.js");

passport.serializeUser(function(user, done) {
  done(null, user);
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
      callbackURL: details.call_back,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {

      User.findOne({
        username: profile.emails[0].value
      }, function(err, user) {

        if (user == null) {
          User.findOrCreate({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            icon: profile._json.picture,
            username: profile.emails[0].value,
            googleId: profile.id
          }, function(err, user) {
            return cb(err, user);
          });
        } else {
          if (user.googleId == null && profile.id) {
            user.googleId = profile.id;
          }
          if (user.firstName == null && profile.name.givenName) {
            user.firstName = profile.name.givenName;
          }
          if (user.lastName == null && profile.name.familyName) {
            user.lastName = profile.name.familyName;
          }
          if (user.icon == null && profile._json.picture) {
            user.icon = profile._json.picture;
          }
          user.save();
          return cb(err, user);
        }

      });

    }
  ));
});
