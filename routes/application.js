const express = require("express");
const Router = express.Router();
const path = require('path');

Router.use("/secrets", require("./application" +"/secrets"));
Router.use("/mail", require("./application" + "/mail"));
Router.use("/todolist", require("./application" + "/todolist"));

module.exports = Router;
