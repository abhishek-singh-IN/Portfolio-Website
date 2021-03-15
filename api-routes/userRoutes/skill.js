var express = require("express");
var Router = express.Router();
var path = require('path');
var mongoose = require("mongoose");

var Skill = require(path.resolve("src/Schema/")+"/Skill.js");

Router.get("/", function (req, res) {
    Skill.find({}, function (err, foundSkills) {
        res.render("pages/skills", {
            listofSkills: foundSkills
        });
    });
});

Router.get('/android', function (req, res) {
    res.render("pages/skill/android");
});
Router.get('/bigdata', function (req, res) {
    res.render('pages/skill/bigdata');
});
Router.get('/cyber-security', function (req, res) {
    res.render('pages/skill/cyber_security');
});
Router.get('/dbms', function (req, res) {
    res.render('pages/skill/dbms');
});
Router.get('/dl', function (req, res) {
    res.render('pages/skill/dl');
});
Router.get('/dsa', function (req, res) {
    res.render('pages/skill/dsa');
});
Router.get('/ml', function (req, res) {
    res.render('pages/skill/ml');
});
Router.get('/networking', function (req, res) {
    res.render('pages/skill/networking');
});
Router.get('/web-development', function (req, res) {
    res.render('pages/skill/web-development');
});
module.exports = Router;
