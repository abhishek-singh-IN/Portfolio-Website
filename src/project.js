const express=require("express");
const Router=express.Router();

Router.get('/',function (req,res){
    res.sendFile('project.html',{root:__dirname})
});
Router.get('/Age-Calculator',function (req,res){
    res.sendFile('project/Age-Calculator.html',{root:__dirname})
});
Router.get('/AI-Voice-Assistant',function (req,res){
    res.sendFile('project/AI-Voice-Assistant.html',{root:__dirname})
});
Router.get('/Calculator',function (req,res){
    res.sendFile('project/Calculator.html',{root:__dirname})
});
Router.get('/Football-Management-System',function (req,res){
    res.sendFile('project/Football-Management-System.html',{root:__dirname})
});
Router.get('/Image-Captioning-Bot',function (req,res){
    res.sendFile('project/Image-Captioning-Bot.html',{root:__dirname})
});
Router.get('/Portfolio-Website',function (req,res){
    res.sendFile('project/Portfolio-Website.html',{root:__dirname})
});
Router.get('/Quizz',function (req,res){
    res.sendFile('project/Quizz.html',{root:__dirname})
});
Router.get('/Shopping-Mall-Management-System',function (req,res){
    res.sendFile('project/Shopping-Mall-Management-System.html',{root:__dirname})
});
module.exports=Router;
