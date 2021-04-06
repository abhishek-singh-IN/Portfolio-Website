const express = require('express');
const app = express();
const session = require('express-session');
const passport = require("passport");
const config = require('./config/config.js');
const compress_images = require("compress-images");
const path = require('path');
const mongoose = require("mongoose");
const {
  clearKey
} = require(path.resolve("src") + "/cache.js");
app.set('view engine', 'ejs');

const Tool = require(path.resolve("src/Schema/") + "/Tool.js");
const Testimonal = require(path.resolve("src/Schema/") + "/Testimonal.js");
const Project = require(path.resolve("src/Schema/") + "/Project.js");

INPUT_path_to_your_images = "public/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";
OUTPUT_path = "build/img/";

compress_images(INPUT_path_to_your_images, OUTPUT_path, {
    compress_force: false,
    statistic: true,
    autoupdate: true
  }, false, {
    jpg: {
      engine: "mozjpeg",
      command: ["-quality", "60"]
    }
  }, {
    png: {
      engine: "pngquant",
      command: ["--quality=20-50", "-o"]
    }
  }, {
    svg: {
      engine: "svgo",
      command: "--multipass"
    }
  }, {
    gif: {
      engine: "gifsicle",
      command: ["--colors", "64", "--use-col=web"]
    }
  },
  function(error, completed, statistic) {
    if (error != null || completed == false || statistic) {
      console.log("-------------");
      if (error != null) {
        console.log(error);
      }
      if (completed == false) {
        console.log(completed);
      }
      if (statistic) {
        console.log(statistic);
      }
      console.log("-------------");
    }
  }
);

const database_connection = require("./routes" + "/connection")

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", async (req, res) => {
  let tooldetails = await Tool.find({}).cache();
  let testimonaldetails = await Testimonal.find({}).cache();
  let foundProjects = await Project.find({}).cache();
  try {
    res.render("guest/home", {
      listoftools: tooldetails,
      listoftestimonals: testimonaldetails,
      listofprojects: foundProjects
    });
  } catch (err) {
    console.log(err);
  }
});

app.get('/sitemap.xml', function(req, res) {
  res.sendFile("sitemap.xml", {
    root: './public'
  });
});
app.get('/robots.txt', function(req, res) {
  res.sendFile("robots.txt", {
    root: './public'
  });
});
app.get('/.well-known/microsoft-identity-association.json', function(req, res) {
  res.sendFile("./config/microsoft-identity-association.json", {
    root: '.'
  });
});

app.use('/public', express.static(path.join(path.resolve('public'))));
app.use('/build', express.static(path.join(path.resolve('build'))));
app.use('/logo', express.static(path.join(path.resolve('build/img/logo.png'))));


app.get('/Resume', function(req, res) {
  res.sendFile(path.resolve('public/docs/ABHISHEK SINGH.pdf'));
});
app.get('/Privacy-policy', function(req, res) {
  res.render("templates/privacy-policy")
});
app.get('/Terms-of-Service', function(req, res) {
  res.render("templates/terms-of-service")
});
app.get('/test', function(req, res) {
  res.render("test");
});
app.use(require("./routes" + "/user"));
app.use("/account",require("./routes" + "/accounts"));
app.use("/application",require("./routes" + "/application"));
app.use("/api",require("./routes/api" + "/api-controller"));
app.use(require("./routes" + "/error"));

app.listen(config.port, function() {
  console.log('Server Listening on ' + "http://127.0.0.1:" + config.port)
});
