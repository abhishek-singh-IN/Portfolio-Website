var mongoose = require('mongoose');

var ProjectSchema = {
  link: String,
  year: String,
  title: String,
  technology: String,
  projectDiscription1: String,
  projectDiscription2: String
};

module.exports = mongoose.model("Project", ProjectSchema);
