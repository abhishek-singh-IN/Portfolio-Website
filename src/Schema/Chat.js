var mongoose = require('mongoose');

var ChatSchema = {
  timestamp:String,
  email: String,
  message: String
};

module.exports = mongoose.model("Chat", ChatSchema);
