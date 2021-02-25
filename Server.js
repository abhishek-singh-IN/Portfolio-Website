const express = require('express');
const server = express();
const config = require('./config/config.js');
server.set('view engine', 'ejs');
const database_connection = require("./api-routes" + "/connection")

server.use("/", require("./api-routes" + "/routes"));
server.use(require("./api-routes" + "/error"));

server.listen(config.port, function() {
  console.log('Server Listening on '+"http://127.0.0.1:"+config.port)
});
