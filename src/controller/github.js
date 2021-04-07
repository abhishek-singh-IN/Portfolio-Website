const mongoose = require("mongoose"),
  findOrCreate = require('mongoose-findorcreate'),
  passport = require("passport"),
  GithubStrategy = require('passport-github2').Strategy,
  path = require('path');

const userdetailschema = require(path.resolve("src/Schema/") + "/User.js"),
  Github = userdetailschema.Github,
  User = userdetailschema.User;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_OAUTH_APP_ID,
    clientSecret: process.env.GITHUB_OAUTH_APP_SECRET,
    callbackURL: process.env.OAUTH_SUB_DOMAIN + process.env.GITHUB_OAUTH_APP_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {

    const tempProfile = new Github({
      timestamp: new Date(),
      login: profile._json.login,
      id: profile.id,
      node_id: profile.node_id,
      displayName: profile.displayName,
      username: profile.username,
      profileUrl: profile.profileUrl,
      emails: profile.emails,
      photos: profile.photos,
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
      updated_at: profile._json.updated_at
    });

    User.findOne({
      username: profile.emails[0].value
    }, function(err, founduser) {

      if (founduser == null) {

        const record = new User({
          displayName: tempProfile.displayName,
          username: tempProfile.emails[0].value,
          github: tempProfile,
          icon: tempProfile.photos[0].value
        })
        User.insertMany(record, function(err, founduser) {
          return cb(err, founduser)
        });

      } else if (!founduser.github) {
        founduser.github.push(tempProfile);
      } else {
        const checkuser = founduser.github.slice().reverse();
        try {
          if (checkuser[0].login != profile._json.login ||
            checkuser[0].id != profile.id ||
            checkuser[0].node_id != profile.node_id ||
            checkuser[0].displayName != profile.displayName ||
            checkuser[0].username != profile.username ||
            checkuser[0].profileUrl != profile.profileUrl ||
            checkuser[0].avatar_url != profile._json.avatar_url ||
            checkuser[0].gravatar_id != profile._json.gravatar_id ||
            checkuser[0].url != profile._json.url ||
            checkuser[0].html_url != profile._json.html_url ||
            checkuser[0].followers_url != profile._json.followers_url ||
            checkuser[0].following_url != profile._json.following_url ||
            checkuser[0].gists_url != profile._json.gists_url ||
            checkuser[0].starred_url != profile._json.starred_url ||
            checkuser[0].subscriptions_url != profile._json.subscriptions_url ||
            checkuser[0].organizations_url != profile._json.organizations_url ||
            checkuser[0].repos_url != profile._json.repos_url ||
            checkuser[0].events_url != profile._json.events_url ||
            checkuser[0].received_events_url != profile._json.received_events_url ||
            checkuser[0].type != profile._json.type ||
            checkuser[0].site_admin != profile._json.site_admin ||
            checkuser[0].name != profile._json.name ||
            checkuser[0].company != profile._json.company ||
            checkuser[0].blog != profile._json.blog ||
            checkuser[0].location != profile._json.location ||
            checkuser[0].email != profile.emails[0].value ||
            checkuser[0].hireable != profile._json.Boolean ||
            checkuser[0].bio != profile._json.bio ||
            checkuser[0].twitter_username != profile._json ||
            checkuser[0].public_repos != profile._json.public_repos ||
            checkuser[0].public_gists != profile._json.public_gists ||
            checkuser[0].followers != profile._json.followers ||
            checkuser[0].following != profile._json.following ||
            checkuser[0].created_at != profile._json.created_at ||
            checkuser[0].updated_at != profile._json.updated_at) {
            founduser.github.push(tempProfile);
          }
        } catch (err) {
          founduser.github.push(tempProfile);
        }
        if (founduser.icon == null && profile.photos[0].value) founduser.icon = profile.photos[0].value;

        founduser.save();
        return cb(err, founduser);
      }
    });

  }

));
