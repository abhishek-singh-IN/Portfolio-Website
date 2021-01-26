var express=require('express');
var bodyParser = require('body-parser');
var path=require('path');

const mysqlConnection=require("./src/Routes/connection")
const PeopleRoutes=require("./src/Routes" + "/contact");

var server=express();

server.use("/contact1",PeopleRoutes)

server.use('/css',express.static(path.join(__dirname, 'src/CSS')));
server.use('/desktop',express.static(path.join(__dirname, 'src/CSS/desktop')));
server.use('/ico',express.static(path.join(__dirname, 'ico')));
server.use('/Images',express.static(path.join(__dirname, 'Images')));
server.use('/Javascript',express.static(path.join(__dirname,'src/Javascript')));
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/',function (req,res){
    res.sendFile('index.html',{root:__dirname})
});
server.get('/index',function (req,res){
    res.sendFile('index.html',{root:__dirname})
});
server.get('/Home',function (req,res){
    res.sendFile('index.html',{root:__dirname})
});
server.get('/About',function (req,res){
    res.sendFile('src/HTML/About.html',{root:__dirname})
});
server.get('/Skill',function (req,res){
    res.sendFile('src/HTML/skills.html',{root:__dirname})
});
server.get('/Skill/DSA',function (req,res){
    res.sendFile('src/skills/DSA.html',{root:__dirname})
});
server.get('/Project',function (req,res){
    res.sendFile('src/HTML/project.html',{root:__dirname})
});
server.get('/Contact',function (req,res){
    res.sendFile('src/HTML/contact.html',{root:__dirname})
});
server.get('/Experience',function (req,res){
    res.sendFile('src/HTML/experience.html',{root:__dirname})
});
server.get('/Gallery',function (req,res){
    res.sendFile('src/HTML/Gallery.html',{root:__dirname})
});
server.get('/Resume',function (req,res){
    res.sendFile('Document/Abhishek Singh.pdf',{root:__dirname})
});
server.post('/contactform',(req, res) => {
    res.send(`${req.body.Name}':Your form has been submitted'.`);
});
server.listen(80,function (){
    console.log('Server Listening to Port:80')
});
