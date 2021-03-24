var mongoose = require('mongoose');

var TestimonalSchema = {
data:String,
name:String,
designation:String,
image:String
};

module.exports = mongoose.model("Testimonal", TestimonalSchema);
