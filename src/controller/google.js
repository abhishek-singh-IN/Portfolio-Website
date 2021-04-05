const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var path = require('path');

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const Google = userdetailschema.Google;
const User = userdetailschema.User;

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

      User.findOne({
        username: tempProfile.email
      }, function(err, founduser) {

        if (founduser == null) {

          const record = new User({
            displayName: tempProfile.displayName,
            firstName: tempProfile.givenName,
            lastName: tempProfile.familyName,
            username: tempProfile.email,
            google: tempProfile,
            icon: tempProfile.photos[0].value
          })
          User.insertMany(record, function(err, founduser) {
            return cb(err, founduser)
          });

        } else if (!founduser.google) {
          founduser.google.push(tempProfile);
        } else {
          const checkuser = founduser.google.slice().reverse();
          try {
            if (checkuser[0].id != profile.id ||
              checkuser[0].email != profile._json.email ||
              checkuser[0].displayName != profile.displayName ||
              checkuser[0].familyName != profile.name.familyName ||
              checkuser[0].givenName != profile.name.givenName ||
              checkuser[0].locale != profile._json.locale) {
              founduser.google.push(tempProfile);
            }
          } catch (err) {
            founduser.google.push(tempProfile);
          }

          if (founduser.firstName == null && profile.name.givenName) {
            founduser.firstName = profile.name.givenName;
          }
          if (founduser.lastName == null && profile.name.familyName) {
            founduser.lastName = profile.name.familyName;
          }
          founduser.save();
          return cb(err, founduser);
        }

      });

    }
  ));
});
