const express=require("express");
const Router=express.Router();

const mysqlConnection=require("./connection")

Router.get("/",(req,res)=>{
    mysqlConnection.query("Select * from contact1",(err,rows,fields)=>{
        if(!err)
        {
            res.send(rows);
            console.log("Sucess")
        }
        else
        {
            console.log(err);
        }
    })
})

module.exports=Router;
