const express = require("express")
var Router = express.Router();
const mongoose = require("mongoose")
const path = require('path');
const l = require(path.resolve("src/Schema/") + "/Logs.js");
const Logs = l.Log;

Router.get("/", function(req, res) {
  try {
    if (!req.isAuthenticated()) throw new Error("User not Authorised");

    var pageNo = parseInt(req.query.page)
    var size = parseInt(req.query.limit)
    if (pageNo < 0 || pageNo === 0) {
      pageNo = 1;
    };
    Logs.findOne({
      name: req.user.username
    }, function(err, foundList) {
      if(err){
        res.send(err);
      }else{
        if(foundList.__v<size){
          size=foundList.__v;
        }
        if(pageNo>Math.ceil((foundList.__v)/size)){
          pageNo=1;
        }
        var totalPages = Math.ceil((foundList.__v)/size);
        var start=(foundList.__v)-((pageNo-1)*size);
        let senddata=[];
        for(var i=0;i<size;i++){
          senddata.push(foundList.logdetails[start-i]);
          if (start-i === 0) { break; }
        }
        res.render("user/logdetails", {
          ListTitle: foundList.name,
          newListItems: senddata,
          maxlist:totalPages,
          pageNo:pageNo,
          size:size
        });
      }
    })

  } catch (err) {
    res.redirect("/account/login");
  }
});
module.exports = Router;
