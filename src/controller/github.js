const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');
const passport = require("passport");
const GithubStrategy = require('passport-github2').Strategy;

var path = require('path');

const userdetailschema = require(path.resolve("src/Schema/") + "/User.js");
const github = userdetailschema.Github;
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

fs.readFile(path.resolve("secrets/github-auth.json"), function(err, data) {
  if (err) throw err;
  var details = JSON.parse(data);

  passport.use(new GithubStrategy({
      clientID: details.app_id,
      clientSecret: details.app_secret,
      callbackURL: details.call_back
    },
    function(accessToken, refreshToken, profile, cb) {

      const git = new github({
        timestamp:new Date(),
        login: profile._json.login,
        id: profile.id,
        node_id: profile.node_id,
        avatar_url: profile._json.avatar_url,
        gravatar_id: profile._json.gravatar_id,
        url: profile._json.url,
        html_url: profile._json.html_url,
        followers_url: profile._json.followers_url,
        following_url: profile._json.following_url,
        gists_url: profile._json.gists_url,
        starred_url: profile._json.starred_url,
        subscriptions_url: profile._json.subscriptions_url,
        organizations_url: profile._json.organizations_url,
        repos_url: profile._json.repos_url,
        events_url: profile._json.events_url,
        received_events_url: profile._json.received_events_url,
        type: profile._json.type,
        site_admin: profile._json.site_admin,
        name: profile._json.name,
        company: profile._json.company,
        blog: profile._json.blog,
        location: profile._json.location,
        email: profile.emails[0].value,
        hireable: profile._json.Boolean,
        bio: profile._json.bio,
        twitter_username: profile._json,
        public_repos: profile._json.public_repos,
        public_gists: profile._json.public_gists,
        followers: profile._json.followers,
        following: profile._json.following,
        created_at: profile._json.created_at,
        updated_at: profile._json.updated_at,
        photos: profile.photos[0].value
      });
      User.findOne({
        username: profile.emails[0].value
      }, function(err, founduser) {

        if (founduser == null) {

          const record = new User({
            username: profile.emails[0].value,
            github: git,
            icon: profile.photos[0].value
          })

          User.insertMany(record, function(err, founduser) {
            return cb(err, founduser)
          });

        } else {
          if (founduser.github == null) {
            founduser.github.push(git);
          }
          if (founduser.icon == null && profile.photos[0].value) {
            founduser.icon = profile.photos[0].value;
          }
          founduser.save();
          return cb(err, founduser);
        }
      })

    }

  ));
});
