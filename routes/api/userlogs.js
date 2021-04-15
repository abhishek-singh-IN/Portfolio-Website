const express = require('express')
const Router = express.Router()
const path = require('path');
const l = require(path.resolve("src/Schema/") + "/Logs.js");
const Logs = l.Log;

Router.get('/', async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    var pageNo = parseInt(req.query.page)
    var size = parseInt(req.query.limit)
    if (pageNo < 0 || pageNo === 0) {
      response = {
        "error": true,
        "message": "invalid page number, should start with 1"
      };
      return res.json(response)
    }

    Logs.find({
      _id: req.query.objectid
    }, function(err, data) {
      if (err) {
        response = {
          "error": true,
          "message": "Error fetching data"
        };
      } else if (!req.query.limit) {
        response = {
          "error": false,
          "message": data[0].logdetails
        };
      } else {
        var totalPages = Math.ceil((data[0].__v) / size);
        var start = (data[0].__v) - ((pageNo - 1) * size);
        let senddata = [];
        for (var i = 0; i < size; i++) {
          senddata.push(data[0].logdetails[start - i]);
        }
        response = {
          "error": false,
          "message": senddata,
          "pages": totalPages
        };
      }
      res.json(response);
    });
  } catch (Error) {
    console.log(Error);
  }
})

module.exports = Router;
