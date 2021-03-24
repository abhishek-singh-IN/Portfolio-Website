var mongoose = require('mongoose');

var ContactSchema = {
  timestamp:String,
  name: String,
  email: String,
  telephone: String,
  message: String
};

module.exports = mongoose.model("Contact", ContactSchema);
