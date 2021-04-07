var mongoose = require('mongoose');

const paragraphSchema = {
date:String,
title:String,
content:String
}

const blogSchema = new mongoose.Schema({
  date:String,
  title:String,
  content:String,
  paragraph: [paragraphSchema]
});

module.exports = {
  Paragraph: mongoose.model("Paragraph", paragraphSchema),
  Blog: mongoose.model("Blog", blogSchema)
}
