var mongoose = require('mongoose');

var SkillSchema = {
    name: String,
    description: String,
    url: String
};

module.exports = mongoose.model("Skill", SkillSchema);
