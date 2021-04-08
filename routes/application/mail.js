const nodemailer = require("nodemailer"),
  express = require("express"),
  Router = express.Router(),
  path = require('path'),
  bodyParser = require("body-parser");

const Mail = require(path.resolve("src/Schema") + "/Mail.js"),
  MailId = Mail.MailId,
  Mailrecord = Mail.Mailrecord,
  MailSent = Mail.MailSent,
  MailReceived = Mail.MailReceived;

Router.use(bodyParser.urlencoded({
  extended: true
}));

let transporter = nodemailer.createTransport({
  host: process.env.AWS_SMTP_ENDPOINT,
  port: process.env.AWS_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.AWS_SMTP_USERNAME,
    pass: process.env.AWS_SMTP_PASSWORD
  }
});

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
    req.session.redirectTo = "/application/sentMail";
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
