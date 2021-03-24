var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const githubdataSchema = {
  timestamp: String,
  login: String,
  id: String,
  node_id: String,
  avatar_url: String,
  gravatar_id: String,
  url: String,
  html_url: String,
  followers_url: String,
  following_url: String,
  gists_url: String,
  starred_url: String,
  subscriptions_url: String,
  organizations_url: String,
  repos_url: String,
  events_url: String,
  received_events_url: String,
  type: String,
  site_admin: Boolean,
  name: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: Boolean,
  bio: String,
  twitter_username: String,
  public_repos: Number,
  public_gists: Number,
  followers: Number,
  following: Number,
  created_at: String,
  updated_at: String,
  photos: String
}

const googledataSchema = {
  timestamp: String,
  id: String,
  displayName: String,
  familyName: String,
  givenName: String,
  email: String,
  photos: String,
  locale: String,
}

const facebookdataSchema = {
  timestamp: String,
  id: String,
  displayName: String,
  familyName: String,
  givenName: String,
  middleName: String,
  gender: String,
  emails: String,
  photos: String
}

const microsoftdataSchema = {
  timestamp: String,
  id: String,
  displayName: String,
  familyName: String,
  givenName: String,
  emails: String,
  photos: String,
  businessPhones: String,
  jobTitle: String,
  mobilePhone: String,
  officeLocation: String,
  preferredLanguage: String
}

const userSchema = new mongoose.Schema({

  //account type
  type: String,

  //account basic details
  firstName: String,
  lastName: String,
  birthday: String,

  //other Details
  icon: String,
  mobile: String,
  gender: String,
  emailId: String,
  emailIdAlternate: String,
  mobileNoAlternate: Number,

  // Personnel Info
  occupation: String,

  //account username
  username: String,
  password: String,

  //social media accounts
  github: [githubdataSchema],
  google: [googledataSchema],
  facebook: [facebookdataSchema],
  microsoft: [microsoftdataSchema],
  instagramId: String,
  twitterId: String,
  telegramId: String,

  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
module.exports = {
  Github: mongoose.model("Github", githubdataSchema),
  Google: mongoose.model("Google", googledataSchema),
  Facebook: mongoose.model("Facebook", facebookdataSchema),
  Microsoft: mongoose.model("Microsoft", microsoftdataSchema),
  User: mongoose.model("User", userSchema)
}
