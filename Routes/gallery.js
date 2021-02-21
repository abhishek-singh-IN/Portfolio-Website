const express=require("express");
const Router=express.Router();

Router.get('/',function (req,res){
    res.render("Gallery")
});

module.exports=Router;
