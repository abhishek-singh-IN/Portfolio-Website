const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const path = require('path');
const {
  clearKey
} = require(path.resolve("src") + "/cache.js");
const Project = require(path.resolve("src/Schema/") + "/Project.js");

Router.get("/", async (req, res) => {
  let foundProjects = await Project.find({}).cache();
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    res.render("admin/project", {
      listofprojects: foundProjects
    });
  } catch (err) {
    res.render("guest/project", {
      listofprojects: foundProjects
    });
  }
});
Router.post("/project", function(req, res) {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    var project = {
      year: req.body.projectTimeline,
      title: req.body.projectName,
      technology: req.body.technologyStack,
      projectDiscription1: req.body.description1,
      projectDiscription2: req.body.description2,
      link: _.lowerCase(req.body.projectName)
    };
    Project.insertMany(project, function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.redirect("/project");
  } catch (err) {
    res.redirect("/account");
  }
})
Router.get('/Age-Calculator', function(req, res) {
  // res.render('guest/project/Age-Calculator');
  res.redirect("https://play.google.com/store/apps/details?id=tech.singhabhishek.agecalculatorinminutes");
});
Router.get('/AI-Voice-Assistant', function(req, res) {
  res.render('guest/project/AI-Voice-Assistant');
});
Router.get('/AI-Voice-Assistant/thesis', function(req, res) {
  res.sendFile(path.resolve('public/docs/project/Vai_thesis.pdf'));
});
Router.get('/Project/AI-Voice-Assistant/ppt', function(req, res) {
  res.sendFile(path.resolve('public/docs/project/Vai_ppt.pptx'));
});
Router.get('/Calculator', function(req, res) {
  res.redirect("https://play.google.com/store/apps/details?id=tech.singhabhishek.calculator");
  // res.render('guest/project/Calculator');
});
Router.get('/Football-Management-System', function(req, res) {
  res.redirect("https://github.com/abhishek-singh-IN/FBMS");
  // res.render('guest/project/Football-Management-System');
});
Router.get('/Image-Captioning-Bot', function(req, res) {
  res.render('guest/project/Image-Captioning-Bot');
});
Router.get('/Image-Captioning-Bot/document', function(req, res) {
  res.sendFile(path.resolve('public/docs/project/Caption.docx'));
});
Router.get('/Image-Captioning-Bot/ppt', function(req, res) {
  res.sendFile(path.resolve('public/docs/project/Caption.pdf'));
});
Router.get('/Portfolio-Website', function(req, res) {
  res.redirect("https://github.com/abhishek-singh-IN/Portfolio-Website");
  // res.render('guest/project/Portfolio-Website');
});
Router.get('/Quizz', function(req, res) {
  res.render('guest/project/Quizz');
});
Router.get('/Shopping-Mall-Management-System', function(req, res) {
  res.redirect("https://github.com/abhishek-singh-IN/Shopping-Mall-Management-System");
  // res.render('guest/project/Shopping-Mall-Management-System');
});
module.exports = Router;
