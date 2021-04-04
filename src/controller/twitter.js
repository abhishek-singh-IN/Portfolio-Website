const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const TwitterStrategy = require('passport-twitter').Strategy;

var path = require('path');

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const twitter = userdetailschema.Twitter;
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

fs.readFile(path.resolve("secrets/twitter.json"), function(err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

  passport.use(new TwitterStrategy({
      consumerKey: details.api_key,
      consumerSecret: details.app_secret,
      callbackURL: details.call_back,
      userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
    },
    function(accessToken, refreshToken, profile, cb) {

      const tempProfile = new twitter({
        timestamp: new Date(),
        id: profile.id,
        displayName: profile.displayName,
        email: profile._json.email,
        emails: profile.emails,
        photos: profile.photos,
        screen_name: profile._json.screen_name,
        location: profile._json.location,
        followers_count: profile._json.followers_count,
        friends_count: profile._json.friends_count,
        created_at: profile._json.created_at,
        favourites_count: profile._json.favourites_count,
        verified: profile._json.verified,
        statuses_count: profile._json.statuses_count,
        profile_background_color: profile._json.profile_background_color,
        profile_background_image_url: profile._json.profile_background_image_url,
        profile_background_image_url_https: profile._json.profile_background_image_url_https,
        profile_background_tile: profile._json.profile_background_tile,
        profile_image_url: profile._json.profile_image_url,
        profile_image_url_https: profile._json.profile_image_url_https,
        profile_link_color: profile._json.profile_link_color,
        profile_sidebar_border_color: profile._json.profile_sidebar_border_color,
        profile_sidebar_fill_color: profile._json.profile_sidebar_fill_color,
        profile_text_color: profile._json.profile_text_color,
        profile_use_background_image: profile._json.profile_use_background_image,
        has_extended_profile: profile._json.has_extended_profile,
        default_profile: profile._json.default_profile,
        default_profile_image: profile._json.default_profile_image,
        following: profile._json.following,
        follow_request_sent: profile._json.follow_request_sent,
        notifications: profile._json.notifications
      });

      User.findOne({
        username: profile.emails[0].value
      }, function(err, founduser) {

        if (founduser == null) {

          const record = new User({
            username: profile.emails[0].value,
            twitter: tempProfile,
            icon: profile.photos[0].value
          });

          User.insertMany(record, function(err, founduser) {
            return cb(err, founduser)
          });

        } else if (!founduser.twitter) {
          founduser.twitter.push(tempProfile);
        } else {
          const checkuser = founduser.twitter.slice().reverse();
          try {
            if (checkuser[0].id != profile.id ||
              checkuser[0].displayName != profile.displayName ||
              checkuser[0].email != profile._json.email ||
              checkuser[0].screen_name != profile._json.screen_name ||
              checkuser[0].location != profile._json.location ||
              checkuser[0].followers_count != profile._json.followers_count ||
              checkuser[0].friends_count != profile._json.friends_count ||
              checkuser[0].created_at != profile._json.created_at ||
              checkuser[0].favourites_count != profile._json.favourites_count ||
              checkuser[0].verified != profile._json.verified ||
              checkuser[0].statuses_count != profile._json.statuses_count ||
              checkuser[0].profile_background_color != profile._json.profile_background_color ||
              checkuser[0].profile_background_image_url != profile._json.profile_background_image_url ||
              checkuser[0].profile_background_image_url_https != profile._json.profile_background_image_url_https ||
              checkuser[0].profile_background_tile != profile._json.profile_background_tile ||
              checkuser[0].profile_image_url != profile._json.profile_image_url ||
              checkuser[0].profile_image_url_https != profile._json.profile_image_url_https ||
              checkuser[0].profile_link_color != profile._json.profile_link_color ||
              checkuser[0].profile_sidebar_border_color != profile._json.profile_sidebar_border_color ||
              checkuser[0].profile_sidebar_fill_color != profile._json.profile_sidebar_fill_color ||
              checkuser[0].profile_text_color != profile._json.profile_text_color ||
              checkuser[0].profile_use_background_image != profile._json.profile_use_background_image ||
              checkuser[0].has_extended_profile != profile._json.has_extended_profile ||
              checkuser[0].default_profile != profile._json.default_profile ||
              checkuser[0].default_profile_image != profile._json.default_profile_image ||
              checkuser[0].following != profile._json.following ||
              checkuser[0].follow_request_sent != profile._json.follow_request_sent ||
              checkuser[0].notifications != profile._json.notifications) {
              founduser.twitter.push(tempProfile);
            }
          } catch (err) {
            founduser.twitter.push(tempProfile);
          }
          if (founduser.icon == null && profile.photos[0].value) {
            founduser.icon = profile.photos[0].value;
          }
          founduser.save();
          return cb(err, founduser);
        }
      });

    }

  ));
});
