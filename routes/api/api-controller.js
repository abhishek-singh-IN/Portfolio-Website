const express = require('express')
const Router = express.Router()
const path = require('path');

Router.use("/user/log", require("./userlogs"));

module.exports = Router;
