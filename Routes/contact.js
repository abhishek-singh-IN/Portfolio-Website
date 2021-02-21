const express=require("express");
const Router=express.Router();

const mysqlConnection=require("./connection")

Router.get("/",(req,res)=>{
    res.render("contact")
})

module.exports=Router;
