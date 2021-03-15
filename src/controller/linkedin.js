const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;

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

fs.readFile(path.resolve("secrets/linkedin-auth.json"), function(err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

  passport.use(new LinkedinStrategy({
      clientID: details.app_id,
      clientSecret: details.app_secret,
      callbackURL: details.call_back,
      profileFields: ["email", "name", 'id', 'displayName', 'gender', 'picture.type(large)']
    },
    function(accessToken, refreshToken, profile, cb) {

      User.findOne({
        username: profile.emails[0].value
      }, function(err, user) {

        if (user == null) {
          User.findOrCreate({
            icon: profile.photos[0].value,
            username: profile.emails[0].value,
            linkedinId: profile.id,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name
          }, function(err, user) {
            return cb(err, user);
          });
        } else {
          if (user.linkedinId == null && profile.id) {
            user.linkedinId = profile.id;
          }
          if (user.icon == null && profile.photos[0].value) {
            user.icon = profile.photos[0].value;
          }
          if (user.firstName == null && profile._json.first_name) {
            user.firstName = profile._json.first_name;
          }
          if (user.lastName == null && profile._json.last_name) {
            user.lastName = profile._json.last_name;
          }
          user.save();
          return cb(err, user);
        }
      });

    }

  ));
});
