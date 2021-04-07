const express = require('express')
const Router = express.Router()
const path = require('path');
const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const User = userdetailschema.User;

Router.get('/', (req, res) => {

  User.findOne({
    _id: req.query.objectid
  }, function(err, data) {
    response = {
      "error": false,
      "message": data
    };
    res.json(response);
  })
})

module.exports = Router;
