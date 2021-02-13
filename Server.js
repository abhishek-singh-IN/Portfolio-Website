const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const server = express();
server.set('view engine', 'ejs');
const database_connection = require("./Routes" + "/connection")
const PeopleRoutes = require("./Routes" + "/contact");

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use('/public', express.static(path.join(__dirname, 'static')));
server.use('/logo', express.static(path.join(__dirname, 'static/img/logo.png')));

server.get('/', function(req, res) {
  res.render("home");
});

server.get('/About', function(req, res) {
  res.render("About");
});

server.use("/blog", require("./Routes" + "/blog"));
server.use("/search", require("./Routes" + "/search"));
server.use("/Skill", require("./Routes" + "/skill"));
server.use("/Project", require("./Routes" + "/project"));
server.use("/Experience", require("./Routes" + "/experience"));

server.get('/Project/AI-Voice-Assistant/thesis', function(req, res) {
  res.sendFile('./static/docs/project/Vai_thesis.pdf', {
    root: __dirname
  })
});

server.get('/Project/AI-Voice-Assistant/ppt', function(req, res) {
  res.sendFile('./static/docs/project/Vai_ppt.pptx', {
    root: __dirname
  })
});
server.get('/Project/Image-Captioning-Bot/document', function(req, res) {
  res.sendFile('./static/docs/project/Caption.docx', {
    root: __dirname
  })
});
server.get('/Project/Image-Captioning-Bot/ppt', function(req, res) {
  res.sendFile('./static/docs/project/Caption.pdf', {
    root: __dirname
  })
});

server.get('/Contact', function(req, res) {
  res.render("contact")
});

server.get('/Gallery', function(req, res) {
  res.render("Gallery")
});

server.get('/Resume', function(req, res) {
  res.sendFile('./static/docs/ABHISHEK SINGH.pdf', {
    root: __dirname
  })
});

server.post('/contactform', (req, res) => {
  res.send(`${req.body.Name}':Your form has been submitted'.`);
});

var listener = server.listen(process.env.PORT || 3000, function() {
  console.log('Server Listening on '+"http://127.0.0.1:" + listener.address().port)
});
