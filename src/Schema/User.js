var mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({

  //account type
  type: String,

  //account basic details
  firstName: String,
  lastName: String,
  birthday:String,

  //other Details
  icon: String,
  mobile:String,
  gender:String,
  emailId:String,
  emailIdAlternate:String,
  mobileNoAlternate:Number,

  // Personnel Info
  occupation:String,

  //account username
  username: String,
  password: String,

  //social media accounts
  googleId: String,
  facebookId: String,
  microsoftId:String,
  instagramId:String,
  twitterId:String,
  telegramId:String,

  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
