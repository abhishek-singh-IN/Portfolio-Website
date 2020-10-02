var express=require('express');
var server=express();

server.use(express.static('src'))

server.get('/',function (req,res){
    res.sendFile('src/HTML/Home.html',{root:__dirname})
});
server.get('/Home.html',function (req,res){
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

server.get('/Images/IMG_8881.jpg',function (req,res){
    res.sendFile('/Images/IMG_8881.jpg',{root:__dirname})
});
server.get('/Images/logo.png',function (req,res){
    res.sendFile('/Images/logo.png',{root:__dirname})
});
server.get('/Images/20180328_184320.jpg',function (req,res){
    res.sendFile('/Images/20180328_184320.jpg',{root:__dirname})
});