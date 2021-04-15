const express = require("express"),
  Router = express.Router(),
  path = require('path'),
  bodyParser = require("body-parser");

const Mail = require(path.resolve("src/Schema") + "/Mail.js"),
  MailId = Mail.MailId,
  Mailrecord = Mail.Mailrecord,
  MailSent = Mail.MailSent,
  MailReceived = Mail.MailReceived;

const aws_smtp_connection = require(path.resolve("src/") + "/aws_smtp_connection.js"),
  mail_send = require(path.resolve("src/") + "/mail_send.js"),
  mailing = require(path.resolve("src/") + "/mail.js");

Router.use(bodyParser.urlencoded({
  extended: true
}));

Router.get("/", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    res.render('admin/Mail_Compose')
  } catch (err) {
    req.session.redirectTo = "/application/mail";
    res.redirect("/account/login");
  }
});
Router.post("/", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");

    const senderAddressInitial = req.body.senderMailId || "noreply"
    const senderAddressName = req.body.senderName || "Abhishek Singh"
    const mail_details = {
      from: senderAddressName + "<" + senderAddressInitial + "@" + req.body.domain + ">",
      to: req.body.receiverMailId,
      subject: req.body.subject,
      text: req.body.mailBody,
    }

    mail_send(mail_details, aws_smtp_connection, function(result) {
      mailing.insert(senderAddressName, req.body.subject, req.body.mailBody,
        req.body.receiverMailId, result[0], result[1], senderAddressInitial, req.body.domain)
    })

    res.redirect("/application/mail");

  } catch (err) {
    res.redirect("/account/login");
  }
});

Router.get("/inbox", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    res.render('admin/Mail_Inbox')
  } catch (err) {
    req.session.redirectTo = "/application/inbox";
    res.redirect("/account/login");
  }
});
let foundSentMailRecord = [],
  foundMailtoView = [];
Router.get("/sentMail", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    let foundMailRecord = await Mailrecord.find({});
    res.render('admin/Mail_Sent', {
      foundMailRecord: foundMailRecord,
      foundSentMailRecord: foundSentMailRecord,
      foundMailtoView: foundMailtoView
    })
  } catch (err) {
    req.session.redirectTo = "/application/mail/sentMail";
    res.redirect("/account/login");
  }
});

Router.post("/sentMail/IdSelection", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    let foundRecord = await Mailrecord.findOne({
      _id: req.body.userid
    });
    foundSentMailRecord = foundRecord.sentMail;
    res.redirect("/application/mail/sentMail")
  } catch (err) {
    req.session.redirectTo = "/application/sentMail";
    res.redirect("/account/login");
  }
});

Router.post("/sentMail/mailSelection", async (req, res) => {
  try {
    if (!req.isAuthenticated() || req.user.type != 'admin') throw new Error("User not Authorised");
    foundSentMailRecord.filter(obj => {
      if (obj._id == req.body.mailid) foundMailtoView = obj;
    })
    res.redirect("/application/mail/sentMail")
  } catch (err) {
    req.session.redirectTo = "/application/sentMail";
    res.redirect("/account/login");
  }
});
module.exports = Router;
