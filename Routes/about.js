const express=require("express");
const Router=express.Router();

Router.get('/',function (req,res){
    res.render("About")
});

module.exports=Router;
