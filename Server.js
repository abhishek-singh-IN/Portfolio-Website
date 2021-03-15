const express = require('express');
const server = express();
const session = require('express-session');
const passport = require("passport");
const config = require('./config/config.js');
const compress_images = require("compress-images");

INPUT_path_to_your_images = "public/img/**/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";
OUTPUT_path = "build/img/";

compress_images(INPUT_path_to_your_images, OUTPUT_path, { compress_force: false, statistic: true, autoupdate: true }, false,
                { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
                { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
                { svg: { engine: "svgo", command: "--multipass" } },
                { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
  function (error, completed, statistic) {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");
  }
);


server.set('view engine', 'ejs');

const database_connection = require("./api-routes" + "/connection")

server.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

server.use(passport.initialize());
server.use(passport.session());

server.get('/sitemap.xml', function(req, res) {
res.sendFile("sitemap.xml", { root: './public' });
});
server.get('/robots.txt', function(req, res) {
res.sendFile("robots.txt", { root: './public' });
});
server.get('/.well-known/microsoft-identity-association.json', function(req, res) {
res.sendFile("./config/microsoft-identity-association.json", { root: '.' });
});

server.use("/", require("./api-routes" + "/routes"));
server.use(require("./api-routes" + "/error"));

server.listen(config.port, function() {
  console.log('Server Listening on '+"http://127.0.0.1:"+config.port)
});
