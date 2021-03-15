var mongoose = require('mongoose');

var ContactSchema = {
  name: String,
  email: String,
  telephone: String,
  message: String
};

module.exports = mongoose.model("Contact", ContactSchema);
