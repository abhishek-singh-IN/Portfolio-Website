const express = require('express');
const path = require('path');
const server = express();
server.set('view engine', 'ejs');
const database_connection = require("./Routes" + "/connection")

server.use('/public', express.static(path.join(__dirname, 'static')));
server.use('/logo', express.static(path.join(__dirname, 'static/img/logo.png')));

server.use("/", require("./Routes" + "/home"));
server.use("/About", require("./Routes" + "/about"));
server.use("/blog", require("./Routes" + "/blog"));
server.use("/Contact", require("./Routes" + "/contact"));
server.use("/Experience", require("./Routes" + "/experience"));
server.use("/Gallery", require("./Routes" + "/gallery"));
server.use("/Project", require("./Routes" + "/project"));
server.use("/search", require("./Routes" + "/search"));
server.use("/Skill", require("./Routes" + "/skill"));

server.get('/Resume', function(req, res) {
  res.sendFile(path.resolve('static/docs/ABHISHEK SINGH.pdf'))
});

var listener = server.listen(process.env.PORT || 3000, function() {
  console.log('Server Listening on '+"http://127.0.0.1:" + listener.address().port)
});