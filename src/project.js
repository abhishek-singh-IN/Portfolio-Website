const express=require("express");
const Router=express.Router();

Router.get('/',function (req,res){
    res.sendFile('project.html',{root:__dirname})
});

module.exports=Router;
