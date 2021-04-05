const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const MicrosoftStrategy = require('passport-microsoft').Strategy;

var path = require('path');

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const microsoft = userdetailschema.Microsoft;
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
      User.findOne({
        username: tempProfile.emails[0].value
      }, function(err, founduser) {

        if (founduser == null) {

          const record = new User({
            username: tempProfile.emails[0].value,
            displayName: tempProfile.displayName,
            firstName: tempProfile.firstName,
            lastName: tempProfile.lastName,
            microsoft: tempProfile,
            occupation: tempProfile.jobTitle,
            mobile: tempProfile.mobilePhone
          })
          User.insertMany(record, function(err, founduser) {
            return cb(err, founduser)
          });

        } else if (!founduser.microsoft) {
          founduser.microsoft.push(tempProfile);
        } else {
          const checkuser = founduser.microsoft.slice().reverse();
          try {
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
          try {
            if (founduser.firstName == null && profile.name.givenName) {
              founduser.firstName = profile.name.givenName;
            }
          } catch (err) {
            console.log(err);
          }
          try {
            if (founduser.lastName == null && profile.name.familyName) {
              founduser.lastName = profile.name.familyName;
            }
          } catch (err) {
            console.log(err);
          }

          user.save();
          return cb(err, founduser);
        }

      });

    }
  ));
});
