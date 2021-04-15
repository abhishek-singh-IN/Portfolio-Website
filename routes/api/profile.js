const express = require('express')
const Router = express.Router()
const path = require('path');
const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const User = userdetailschema.User;

Router.get('/', (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    User.findOne({
      _id: req.query.objectid
    }, function(err, data) {
      response = {
        "error": false,
        "message": data
      };
      res.json(response);
    })
  } catch (Error) {
    console.log(Error);
  }
})

module.exports = Router;
