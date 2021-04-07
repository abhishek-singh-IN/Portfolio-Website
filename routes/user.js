const express = require("express");
const Router = express.Router();
const path = require('path');

Router.use("/About", require("./userRoutes" + "/about"));
Router.use("/blog", require("./userRoutes" + "/blog"));
Router.use("/Contact", require("./userRoutes" + "/contact"));
Router.use("/Experience", require("./userRoutes" + "/experience"));
Router.use("/Gallery", require("./userRoutes" + "/gallery"));
Router.use("/Project", require("./userRoutes" + "/project"));
Router.use("/search", require("./userRoutes" + "/search"));
Router.use("/Skill", require("./userRoutes" + "/skill"));
Router.use("/chat-message", require("./userRoutes" + "/chat-message"));

module.exports = Router;
