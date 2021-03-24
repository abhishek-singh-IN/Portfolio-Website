const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var path = require('path');

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const google = userdetailschema.Google;
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

      const googleid = new google({
        timestamp:new Date(),
        id: profile.id,
        displayName: profile.displayName,
        familyName: profile.name.familyName,
        givenName: profile.name.givenName,
        email: profile.emails[0].value,
        photos: profile.photos[0].value,
        locale: profile._json.locale,
      });

      User.findOne({
        username: profile.emails[0].value
      }, function(err, founduser) {

        if (founduser == null) {

          const record = new User({
            username: profile.emails[0].value,
            google: googleid,
            icon: profile.photos[0].value
          })
          User.insertMany(record, function(err, founduser) {
            return cb(err, founduser)
          });

        } else {
          const checkuser = founduser.google.slice().reverse();
          try{
            if (checkuser[0].id != profile.id || checkuser[0].displayName != profile.displayName ||
              checkuser[0].familyName != profile.name.familyName || checkuser[0].givenName != profile.name.givenName ||
              checkuser[0].photos != profile.photos[0].value || checkuser[0].locale != profile._json.locale) {
              founduser.google.push(googleid);
            }
          }catch(err){
            founduser.google.push(googleid);
          }

          if (founduser.firstName == null && profile.name.givenName) {
            founduser.firstName = profile.name.givenName;
          }
          if (founduser.lastName == null && profile.name.familyName) {
            founduser.lastName = profile.name.familyName;
          }
          try{
            if ((checkuser[0].photos != profile.photos) || (founduser.icon == null && profile.photos[0].value)) {
              founduser.icon = profile.photos[0].value;
            }
          }catch(err){
            if (founduser.icon == null && profile.photos[0].value) {
              founduser.icon = profile.photos[0].value;
            }
          }

          founduser.save();
          return cb(err, founduser);
        }

      });

    }
  ));
});
