var path = require('path');
const findOrCreate = require('mongoose-findorcreate');

module.exports = function(user, auth) {
  const l = require(path.resolve("src/Schema/") + "/Logs.js");
  const Logs = l.Log;
  const LogsData = l.LogData;

  const datetime = new Date();

  const log = new LogsData({
    time: datetime,
    authtype: auth
  });
  Logs.findOne({
    _id: user
  }, function(err, foundLog) {
    if (foundLog == null) {
      const record = new Logs({
        _id: user
      });
      record.logdetails.push(log);
      Logs.insertMany(record, function(err) {
        if (err) {
          console.log(err);
        }
      });
    } else {
      foundLog.logdetails.push(log);
      foundLog.save();
    }
  })
}
