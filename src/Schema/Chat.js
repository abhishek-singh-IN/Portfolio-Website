var mongoose = require('mongoose');

var ChatSchema = {
  email: String,
  message: String
};

module.exports = mongoose.model("Chat", ChatSchema);
