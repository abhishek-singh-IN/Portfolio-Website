const express = require("express");
const Router = express.Router();
const path = require('path');
const mongoose = require("mongoose");

const userdetailschema = require(path.resolve("src/Schema") + "/User.js");
const User = userdetailschema.User;
const logdetailsschema = require(path.resolve("src/Schema/") + "/Logs.js");
const Logs = logdetailsschema.Log;

Router.get("/:customListName" + "/log", async (req, res) => {
  try {
    var pageNo = parseInt(req.query.page)
    var size = parseInt(req.query.limit)
    if (pageNo < 0 || pageNo === 0) {
      pageNo = 1;
    };
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    Logs.findOne({
      _id: req.params.customListName
    }, function(err, foundList) {
      if (foundList.__v < size) {
        size = foundList.__v;
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
        ListTitle: foundList.name,
        newListItems: senddata,
        maxlist: totalPages,
        pageNo: pageNo,
        size: size,
        linkinitial: "/account/user/" + req.params.customListName + "/log?page="
      });
    })
  } catch (err) {
    res.redirect("/account");
  }
});

Router.get("/:customListName" + "/profile", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    User.findOne({
      _id: req.params.customListName
    }, function(err, foundList) {
      res.render("admin/profile", {
        user: foundList
      });
    })
  } catch (err) {
    res.redirect("/account");
  }
});

module.exports = Router;
