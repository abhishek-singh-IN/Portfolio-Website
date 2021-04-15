var mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

var emailIdSchema = {
  email: String
}

var MailSentSchema = {
  timestamp: String,
  name: String,
  to: [emailIdSchema],
  cc: [emailIdSchema],
  bcc: [emailIdSchema],
  subject: String,
  message: String,
  log: String
}

var MailReceiveSchema = {
  timestamp: String,
  from: [emailIdSchema],
  cc: [emailIdSchema],
  bcc: [emailIdSchema],
  subject: String,
  message: String,
  htmlMessage: String,
  log: String
}

var MailSchema = new mongoose.Schema({
  email: String,
  domain: String,
  sentMail: [MailSentSchema],
  receivedMail: [MailReceiveSchema]
})
MailSchema.plugin(findOrCreate);

module.exports = {
  MailId: mongoose.model("MailId", emailIdSchema),
  Mailrecord: mongoose.model("Mailrecord", MailSchema),
  MailSent:mongoose.model("MailSent",MailSentSchema),
  MailReceived:mongoose.model("MailReceived",MailReceiveSchema)
}
