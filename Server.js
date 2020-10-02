var express=require('express');
var fs=require('fs');
var server=express();

server.get('/',function (req,res){
    res.sendFile('src/HTML/Home.html',{root:__dirname})
});
server.get('/About.html',function (req,res){
    res.sendFile('src/HTML/About.html',{root:__dirname})
});
server.get('/project.html',function (req,res){
    res.sendFile('src/HTML/project.html',{root:__dirname})
});
server.get('/contact.html',function (req,res){
    res.sendFile('src/HTML/contact.html',{root:__dirname})
});
server.get('/experience.html',function (req,res){
    res.sendFile('src/HTML/experience.html',{root:__dirname})
});
server.get('/Gallery.html',function (req,res){
    res.sendFile('src/HTML/Gallery.html',{root:__dirname})
});
server.get('/skills.html',function (req,res){
    res.sendFile('src/HTML/skills.html',{root:__dirname})
});
server.get('/resume.html',function (req,res){
    res.sendFile('src/HTML/resume.html',{root:__dirname})
});
server.listen(3000,function (){
    console.log('Server Listening to Port:3000')
});