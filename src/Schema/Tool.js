var mongoose = require('mongoose');

var ToolSchema = {
title:String,
color:String,
list:Array
};

module.exports = mongoose.model("Tool", ToolSchema);
