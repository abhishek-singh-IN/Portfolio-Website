const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const TwitterStrategy = require('passport-twitter').Strategy;

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

fs.readFile(path.resolve("secrets/twitter-auth.json"), function(err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

  passport.use(new TwitterStrategy({
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
            twitterId: profile.id,
            firstName: profile._json.first_name,
            lastName: profile._json.last_name
          }, function(err, user) {
            return cb(err, user);
          });
        } else {
          if (user.twitterId == null && profile.id) {
            user.twitterId = profile.id;
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
