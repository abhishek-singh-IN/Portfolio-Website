const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;

var path = require('path');

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const facebook = userdetailschema.Facebook;
const User = userdetailschema.User;

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
  function(accessToken, refreshToken, profile, cb) {

    const facebookid = new facebook({
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

    User.findOne({
      username: profile.emails[0].value
    }, function(err, founduser) {

      if (founduser == null) {

        const record = new User({
          username: profile.emails[0].value,
          facebook: facebookid,
          icon: profile.photos[0].value
        });

        User.insertMany(record, function(err, founduser) {
          return cb(err, founduser)
        });

      } else {
        const checkuser = founduser.facebook.slice().reverse();
        try {
          if (checkuser[0].id != profile.id || checkuser[0].displayName != profile.displayName ||
            checkuser[0].familyName != profile.name.familyName || checkuser[0].givenName != profile.name.givenName) {
            founduser.facebook.push(facebookid);
          }
        } catch (err) {
          founduser.facebook.push(facebookid);
        }
        if (founduser.icon == null && profile.photos[0].value) {
          founduser.icon = profile.photos[0].value;
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
