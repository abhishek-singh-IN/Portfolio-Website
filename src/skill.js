const express=require("express");
const Router=express.Router();

Router.get('/',function (req,res){
    res.sendFile('./skills.html',{root:__dirname})
});
Router.get('/DSA',function (req,res){
    res.sendFile('skill/DSA.html',{root:__dirname})
});


module.exports=Router;
