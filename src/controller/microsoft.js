const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const MicrosoftStrategy = require('passport-microsoft').Strategy;

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

fs.readFile(path.resolve("secrets/microsoft-auth.json"), function(err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

  passport.use(new MicrosoftStrategy({
      clientID: details.application_id,
      clientSecret: details.client_secret,
      callbackURL: details.call_back,
      userProfileURL: "https://graph.microsoft.com/User.Read"
    },
    function(accessToken, refreshToken, profile, cb) {

      User.findOne({
        username: profile.emails[0].value
      }, function(err, user) {

        if (user == null) {
          User.findOrCreate({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            username: profile.emails[0].value,
            microsoftId: profile.id
          }, function(err, user) {
            return cb(err, user);
          });
        } else {
          if (user.microsoftId == null && profile.id) {
            user.microsoftId = profile.id;
          }
          if (user.firstName == null && profile.name.givenName) {
            user.firstName = profile.name.givenName;
          }
          if (user.lastName == null && profile.name.familyName) {
            user.lastName = profile.name.familyName;
          }
          if (user.icon == null && profile._json.picture) {
            user.icon = profile.photos[0].value;
          }
          user.save();
          return cb(err, user);
        }

      });

    }
  ));
});
