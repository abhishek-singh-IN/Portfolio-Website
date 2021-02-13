const express=require("express");
const Router=express.Router();
const mongoose = require("mongoose")

const ProjectSchema = {
  link: String,
  year: String,
  title: String,
  technology: String,
  projectDiscription1: String,
  projectDiscription2: String
};
const Project = mongoose.model("Project", ProjectSchema);

Router.get("/", function(req, res) {
  Project.find({}, function(err, foundProjects) {
    res.render("project", {
      listofprojects: foundProjects
    })

  })
});

Router.get('/Age-Calculator',function (req,res){
    res.render('project/Age-Calculator')
});
Router.get('/AI-Voice-Assistant',function (req,res){
    res.render('project/AI-Voice-Assistant')
});
Router.get('/Calculator',function (req,res){
    res.render('project/Calculator')
});
Router.get('/Football-Management-System',function (req,res){
    res.render('project/Football-Management-System')
});
Router.get('/Image-Captioning-Bot',function (req,res){
    res.render('project/Image-Captioning-Bot')
});
Router.get('/Portfolio-Website',function (req,res){
    res.render('project/Portfolio-Website')
});
Router.get('/Quizz',function (req,res){
    res.render('project/Quizz')
});
Router.get('/Shopping-Mall-Management-System',function (req,res){
    res.render('project/Shopping-Mall-Management-System')
});
module.exports=Router;
