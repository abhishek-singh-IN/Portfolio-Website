var mongoose = require("mongoose");

var ExperienceSchema = {
  company_name: String,
  duration: String,
  profile: String,
  description: String,
  link: String
};

module.exports = mongoose.model("Experience", ExperienceSchema);
