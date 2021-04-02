const aws = require('../../secrets/aws_smtp.js');
const nodemailer = require("nodemailer");
const express = require("express");
const Router = express.Router();
const path = require('path');
const bodyParser = require("body-parser");

const Mail = require(path.resolve("src/Schema") + "/Mail.js");
const MailId = Mail.MailId;
const Mailrecord = Mail.Mailrecord;
const MailSent = Mail.MailSent;
const MailReceived = Mail.MailReceived;

Router.use(bodyParser.urlencoded({
  extended: true
}));

let transporter = nodemailer.createTransport({
  host: aws.smtpEndpoint,
  port: aws.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: aws.username,
    pass: aws.password
  }
});

var senderAddress = "Abhishek Singh <noreply@singhabhishek.tech>";
var toAddresses = "abhisheksingh.nsut@gmail.com";
var ccAddresses = "";
var bccAddresses = "";

var subject = "Amazon SES test (Nodemailer)";
var body_text = `Amazon SES Test (Nodemailer)
---------------------------------
This email was sent through the Amazon SES SMTP interface using Nodemailer.
`;
var body_html = `<html>
<head></head>
<body>
  <h1>Amazon SES Test (Nodemailer)</h1>
  <p>This email was sent with <a href='https://aws.amazon.com/ses/'>Amazon SES</a>
        using <a href='https://nodemailer.com'>Nodemailer</a> for Node.js.</p>
</body>
</html>`;

let mailOptions = {
  from: senderAddress,
  to: toAddresses,
  subject: subject,
  cc: ccAddresses,
  bcc: bccAddresses,
  text: body_text,
  html: body_html,
};

Router.get("/", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    res.render('admin/mail')
  } catch (err) {
    req.session.redirectTo = "/application/mail";
    res.redirect("/account/login");
  }
});
Router.post("/", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");

    var senderAddressInitial, senderAddressName;
    if (!req.body.senderMailId) {
      senderAddressInitial = "noreply"
    } else {
      senderAddressInitial = req.body.senderMailId;
    }
    if (!req.body.senderName) {
      senderAddressName = "Abhishek Singh"
    } else {
      senderAddressName = req.body.senderName;
    }

    const tempSentRecord = new MailSent({
      name: senderAddressName,
      subject: req.body.subject,
      message: req.body.mailBody,
    });

    const tempEmailId = new MailId({
      email: req.body.receiverMailId
    })
    tempSentRecord.to.push(tempEmailId);

    transporter.sendMail({
      from: senderAddressName + "<" + senderAddressInitial + "@" + req.body.domain + ">",
      to: req.body.receiverMailId,
      subject: req.body.subject,
      text: req.body.mailBody,
    }, function(error, info) {
      tempSentRecord.timestamp = new Date();
      if (error) {
        tempSentRecord.log = error;
      } else {
        tempSentRecord.log = 'Email sent: ' + info.response;
      }

      Mailrecord.findOne({
        email: senderAddressInitial,
        domain: req.body.domain
      }, function(err, foundmails) {
        if (foundmails == null) {
          const tempMail = new Mailrecord({
            email: senderAddressInitial,
            domain: req.body.domain,
          })
          tempMail.sentMail.push(tempSentRecord);
          Mailrecord.create(tempMail);
        } else {
          foundmails.sentMail.push(tempSentRecord);
          foundmails.save();
        }
      });
      res.redirect("/application/mail");
    });
  } catch (err) {
    res.redirect("/account/login");
  }
});

Router.get("/inbox", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    res.render('admin/inbox')
  } catch (err) {
    req.session.redirectTo = "/application/inbox";
    res.redirect("/account/login");
  }
});

module.exports = Router;
