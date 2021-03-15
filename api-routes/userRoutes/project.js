var express = require("express");
var Router = express.Router();
var mongoose = require("mongoose");
var path = require('path');
var Project = require(path.resolve("src/Schema/")+"/Project.js");

Router.get("/", function (req, res) {
  Project.find({}, function (err, foundProjects) {
    res.render("pages/project", {
      listofprojects: foundProjects
    });
  });
});

Router.get('/Age-Calculator', function (req, res) {
  // res.render('pages/project/Age-Calculator');
  res.redirect("https://play.google.com/store/apps/details?id=tech.singhabhishek.agecalculatorinminutes");
});
Router.get('/AI-Voice-Assistant', function (req, res) {
  res.render('pages/project/AI-Voice-Assistant');
});
Router.get('/AI-Voice-Assistant/thesis', function (req, res) {
  res.sendFile(path.resolve('public/docs/project/Vai_thesis.pdf'));
});
Router.get('/Project/AI-Voice-Assistant/ppt', function (req, res) {
  res.sendFile(path.resolve('public/docs/project/Vai_ppt.pptx'));
});
Router.get('/Calculator', function (req, res) {
  res.redirect("https://play.google.com/store/apps/details?id=tech.singhabhishek.calculator");
  // res.render('pages/project/Calculator');
});
Router.get('/Football-Management-System', function (req, res) {
  res.redirect("https://github.com/abhishek-singh-IN/FBMS");
  // res.render('pages/project/Football-Management-System');
});
Router.get('/Image-Captioning-Bot', function (req, res) {
  res.render('pages/project/Image-Captioning-Bot');
});
Router.get('/Image-Captioning-Bot/document', function (req, res) {
  res.sendFile(path.resolve('public/docs/project/Caption.docx'));
});
Router.get('/Image-Captioning-Bot/ppt', function (req, res) {
  res.sendFile(path.resolve('public/docs/project/Caption.pdf'));
});
Router.get('/Portfolio-Website', function (req, res) {
  res.redirect("https://github.com/abhishek-singh-IN/Portfolio-Website");
  // res.render('pages/project/Portfolio-Website');
});
Router.get('/Quizz', function (req, res) {
  res.render('pages/project/Quizz');
});
Router.get('/Shopping-Mall-Management-System', function (req, res) {
  res.redirect("https://github.com/abhishek-singh-IN/Shopping-Mall-Management-System");
  // res.render('pages/project/Shopping-Mall-Management-System');
});
module.exports = Router;
