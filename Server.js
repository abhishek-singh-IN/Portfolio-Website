var express=require('express');
var bodyParser = require('body-parser');
var path=require('path');

const mysqlConnection=require("./src/Routes/connection")
const PeopleRoutes=require("./src/Routes" + "/contact");

var server=express();

server.use("/contact1",PeopleRoutes)

server.use('/css',express.static(path.join(__dirname, 'src/css')));
server.use('/ico',express.static(path.join(__dirname, 'ico')));
server.use('/Images',express.static(path.join(__dirname, 'img')));
server.use('/Javascript',express.static(path.join(__dirname,'src/javascript')));
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/header',function (req,res){
    res.sendFile('common/header.html',{root:__dirname})
});
server.get('/footer',function (req,res){
    res.sendFile('common/footer.html',{root:__dirname})
});
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
    res.sendFile('src/About.html',{root:__dirname})
});
server.get('/Skill',function (req,res){
    res.sendFile('src/skills.html',{root:__dirname})
});
server.get('/Skill/DSA',function (req,res){
    res.sendFile('src/skill/DSA.html',{root:__dirname})
});
server.get('/Project',function (req,res){
    res.sendFile('src/project.html',{root:__dirname})
});
server.get('/Contact',function (req,res){
    res.sendFile('src/contact.html',{root:__dirname})
});
server.get('/Experience',function (req,res){
    res.sendFile('src/experience.html',{root:__dirname})
});
server.get('/Gallery',function (req,res){
    res.sendFile('src/Gallery.html',{root:__dirname})
});
server.get('/Resume',function (req,res){
    res.sendFile('docs/Abhishek Singh.pdf',{root:__dirname})
});
server.post('/contactform',(req, res) => {
    res.send(`${req.body.Name}':Your form has been submitted'.`);
});
server.listen(80,function (){
    console.log('Server Listening to Port:80')
});
