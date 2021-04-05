var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const githubdataSchema = new mongoose.Schema({
  timestamp: String,
  login: String,
  id: String,
  node_id: String,
  displayName: String,
  username: String,
  profileUrl: String,
  emails: Array,
  photos: Array,
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
})

const googledataSchema = new mongoose.Schema({
  timestamp: String,
  id: String,
  email:String,
  displayName: String,
  familyName: String,
  givenName: String,
  emails: Array,
  photos: Array,
  locale: String,
})

const facebookdataSchema = new mongoose.Schema({
  timestamp: String,
  id: String,
  displayName: String,
  familyName: String,
  givenName: String,
  middleName: String,
  gender: String,
  emails: Array,
  photos: Array
})

const microsoftdataSchema = new mongoose.Schema({
  timestamp: String,
  id: String,
  displayName: String,
  userPrincipalName:String,
  familyName: String,
  givenName: String,
  emails: Array,
  photos: String,
  businessPhones: Array,
  jobTitle: String,
  mobilePhone: String,
  officeLocation: String,
  preferredLanguage: String
})

const twitterdataSchema = new mongoose.Schema({
  timestamp: String,
  id: String,
  displayName: String,
  email: String,
  emails: Array,
  photos: Array,
  screen_name: String,
  location: String,
  followers_count: Number,
  friends_count: Number,
  created_at: String,
  favourites_count: Number,
  verified: Boolean,
  statuses_count: Number,
  profile_background_color: String,
  profile_background_image_url: String,
  profile_background_image_url_https: String,
  profile_background_tile: Boolean,
  profile_image_url: String,
  profile_image_url_https: String,
  profile_link_color: String,
  profile_sidebar_border_color: String,
  profile_sidebar_fill_color: String,
  profile_text_color: String,
  profile_use_background_image: Boolean,
  has_extended_profile: Boolean,
  default_profile: Boolean,
  default_profile_image: Boolean,
  following: Boolean,
  follow_request_sent: Boolean,
  notifications: Boolean
})

const userSchema = new mongoose.Schema({

  //account type
  type: String,

  //account basic details
  displayName:String,
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
  twitter: [twitterdataSchema],

  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
module.exports = {
  Github: mongoose.model("Github", githubdataSchema),
  Google: mongoose.model("Google", googledataSchema),
  Facebook: mongoose.model("Facebook", facebookdataSchema),
  Microsoft: mongoose.model("Microsoft", microsoftdataSchema),
  Twitter: mongoose.model("Twitter", twitterdataSchema),
  User: mongoose.model("User", userSchema)
}
