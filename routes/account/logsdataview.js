const express = require("express")
var Router = express.Router();
const mongoose = require("mongoose")
const path = require('path');
const bodyParser = require("body-parser");
const l = require(path.resolve("src/Schema/") + "/Logs.js");
const Logs = l.Log;

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.get("/", async (req, res) => {
  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");

    var pageNo = parseInt(req.query.page)
    var size = parseInt(req.query.limit)
    if (pageNo < 0 || pageNo === 0) {
      pageNo = 1;
    };
    Logs.findOne({
      _id: req.user._id
    }, function(err, foundList) {
      if (foundList == null) {
        res.redirect("/account");
      } else {
        if (foundList.__v < size) {
          size = (foundList.__v) + 1;
        }
        if (pageNo > Math.ceil((foundList.__v) / size)) {
          pageNo = 1;
        }
        var totalPages = Math.ceil((foundList.__v) / size);
        var start = (foundList.__v) - ((pageNo - 1) * size);
        let senddata = [];
        for (var i = 0; i < size; i++) {
          senddata.push(foundList.logdetails[start - i]);
          if (start - i === 0) {
            break;
          }
        }
        res.render("user/logdetails", {
          ListTitle: foundList._id,
          newListItems: senddata,
          maxlist: totalPages,
          pageNo: pageNo,
          size: size,
          linkinitial: "/account/logs?page="
        });
      }
    })

  } catch (err) {
    res.redirect("/account/login");
  }
});

Router.post("/", async (req, res) => {
  res.redirect("/account/logs?page=1&limit=" + req.body.pages)
})
module.exports = Router;
