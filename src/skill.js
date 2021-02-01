const express=require("express");
const Router=express.Router();
var path=require('path');

Router.get('/',function (req,res){
    res.sendFile('./skills.html',{root:__dirname})
});
Router.get('/android',function (req,res){
    res.sendFile('skill/android.html',{root:__dirname})
});
Router.get('/bigdata',function (req,res){
    res.sendFile('skill/bigdata.html',{root:__dirname})
});
Router.get('/cyber-security',function (req,res){
    res.sendFile('skill/cyber_security.html',{root:__dirname})
});
Router.get('/dbms',function (req,res){
    res.sendFile('skill/dbms.html',{root:__dirname})
});
Router.get('/dl',function (req,res){
    res.sendFile('skill/dl.html',{root:__dirname})
});
Router.get('/dsa',function (req,res){
    res.sendFile('skill/dsa.html',{root:__dirname})
});
Router.get('/ml',function (req,res){
    res.sendFile('skill/ml.html',{root:__dirname})
});
Router.get('/networking',function (req,res){
    res.sendFile('skill/networking.html',{root:__dirname})
});
Router.get('/web-development',function (req,res){
    res.sendFile('skill/web-development.html',{root:__dirname})
});
module.exports=Router;
