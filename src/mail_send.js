module.exports = function(mail_details, sender, callback) {

  let response = [];

  sender.sendMail(mail_details, function(error, info) {

    response.push(new Date());
    if (error) response.push(error);
    else response.push(info.response);

    callback(response)

  });

}
