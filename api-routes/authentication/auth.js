const express = require("express");
var Router = express.Router();
var path = require('path');

Router.use("/google", require("./google"));
Router.use("/facebook", require("./facebook"));
Router.use("/microsoft", require("./microsoft"));
Router.use("/local", require("./local"));

module.exports = Router;
