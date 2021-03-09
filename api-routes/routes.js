var express = require("express");
var path = require('path');
var Router = express.Router();

Router.use('/public', express.static(path.join(path.resolve('public'))));
Router.use('/logo', express.static(path.join(path.resolve('public/img/logo.png'))));

Router.use("/", require("./userRoutes" + "/home"));
Router.use("/About", require("./userRoutes" + "/about"));
Router.use("/blog", require("./userRoutes" + "/blog"));
Router.use("/Contact", require("./userRoutes" + "/contact"));
Router.use("/Experience", require("./userRoutes" + "/experience"));
Router.use("/Gallery", require("./userRoutes" + "/gallery"));
Router.use("/Project", require("./userRoutes" + "/project"));
Router.use("/search", require("./userRoutes" + "/search"));
Router.use("/Skill", require("./userRoutes" + "/skill"));
Router.use("/chat-message", require("./userRoutes" + "/chat-message"));

Router.get('/Resume', function (req, res) {
  res.sendFile(path.resolve('public/docs/ABHISHEK SINGH.pdf'));
});

module.exports = Router;
