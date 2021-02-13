const express=require("express");
const Router=express.Router();
var path=require('path');
const mongoose = require("mongoose")

const SkillSchema = {
  name: String,
  description: String,
  url: String
};
const Skill = mongoose.model("Skill", SkillSchema);

Router.get("/", function(req, res) {
  Skill.find({}, function(err, foundSkills) {
    res.render("skills", {
      listofSkills: foundSkills
    })
  })
});

Router.get('/android',function (req,res){
    res.render("skill/android")
});
Router.get('/bigdata',function (req,res){
    res.render('skill/bigdata')
});
Router.get('/cyber-security',function (req,res){
    res.render('skill/cyber_security')
});
Router.get('/dbms',function (req,res){
    res.render('skill/dbms')
});
Router.get('/dl',function (req,res){
    res.render('skill/dl')
});
Router.get('/dsa',function (req,res){
    res.render('skill/dsa')
});
Router.get('/ml',function (req,res){
    res.render('skill/ml')
});
Router.get('/networking',function (req,res){
    res.render('skill/networking')
});
Router.get('/web-development',function (req,res){
    res.render('skill/web-development')
});
module.exports=Router;
