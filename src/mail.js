const path = require('path')
const Mail = require(path.resolve("src/Schema") + "/Mail.js"),
  MailId = Mail.MailId,
  Mailrecord = Mail.Mailrecord,
  MailSent = Mail.MailSent,
  MailReceived = Mail.MailReceived;

module.exports = {

  insert: async (sender_name, subject, message, receiver_email, timestamp, log, sender_Address, sender_domain) => {

    const tempSentRecord = new MailSent({
      name: sender_name,
      subject: subject,
      message: message,
      timestamp: timestamp,
      log: log
    });
    const tempEmailId = new MailId({
      email: receiver_email
    })
    tempSentRecord.to.push(tempEmailId);

    await Mailrecord.findOrCreate({
      email: sender_Address,
      domain: sender_domain
    }, function(err, foundmails) {
      foundmails.sentMail.push(tempSentRecord);
      foundmails.save();
    });
  },

  view: async (sender_Address, sender_domain, callback) => {
    await Mailrecord.find({
      email: sender_Address,
      domain: sender_domain
    }, function(error, foundresult) {
      callback(foundresult)
    })
  }

}
