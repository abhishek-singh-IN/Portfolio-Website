const express=require("express");
const Router=express.Router();

Router.get('/',function (req,res){
    res.render("experience")
});

module.exports=Router;
