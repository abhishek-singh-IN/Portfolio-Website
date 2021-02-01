var express=require('express');
var bodyParser = require('body-parser');
var path=require('path');
var https=require('https')


const mysqlConnection=require("./src/Routes/connection")
const PeopleRoutes=require("./src/Routes" + "/contact");

var server=express();
server.use(bodyParser.urlencoded({extended:true}));

server.use('/public',express.static(path.join(__dirname, 'static')));
server.use('/logo',express.static(path.join(__dirname, 'static/img/logo.png')));

server.get('/header',function (req,res){
    res.sendFile('src/common/header.html',{root:__dirname})
});
server.get('/footer',function (req,res){
    res.sendFile('src/common/footer.html',{root:__dirname})
});
server.get('/',function (req,res){
    res.sendFile('index.html',{root:__dirname})
});

server.get('/About',function (req,res){
    res.sendFile('src/About.html',{root:__dirname})
});

server.post("/search",function(req,res){

  const googlesearchkey="AIzaSyBC138ZEsveIwl481dDiMRL82UzT5hSTe0"
  const cx="257c47cf4ad1f9e82"
  const content=req.body.search
  const url="https://www.googleapis.com/customsearch/v1?key="+googlesearchkey+"&cx="+cx+"&q="+content

  res.sendFile('src/search.html',{root:__dirname})

  https.get(url,function(resposne){
    console.log(resposne.statusCode);
  })

})

server.use("/Skill",require("./src" + "/skill"));

server.use("/Project",require("./src" + "/project"));
server.get('/Project/AI-Voice-Assistant/thesis',function (req,res){
    res.sendFile('./static/docs/project/Vai_thesis.pdf',{root:__dirname})
});
server.get('/Project/AI-Voice-Assistant/ppt',function (req,res){
    res.sendFile('./static/docs/project/Vai_ppt.pptx',{root:__dirname})
});
server.get('/Project/Image-Captioning-Bot/document',function (req,res){
    res.sendFile('./static/docs/project/Caption.docx',{root:__dirname})
});
server.get('/Project/Image-Captioning-Bot/ppt',function (req,res){
    res.sendFile('./static/docs/project/Caption.pdf',{root:__dirname})
});

server.get('/Contact',function (req,res){
    res.sendFile('src/contact.html',{root:__dirname})
});

server.use("/Experience",require("./src" + "/experience"));

server.get('/Gallery',function (req,res){
    res.sendFile('src/Gallery.html',{root:__dirname})
});
server.get('/Resume',function (req,res){
    res.sendFile('./static/docs/Abhishek Singh.pdf',{root:__dirname})
});
server.post('/contactform',(req, res) => {
    res.send(`${req.body.Name}':Your form has been submitted'.`);
});
var listener = server.listen(process.env.PORT || 3000,function (){
    console.log('Server Listening ' + listener.address().port)
});
