var path = require('path');
const findOrCreate = require('mongoose-findorcreate');
module.exports ={
  insertlog:function (user,auth){
    const l = require(path.resolve("src/Schema/") + "/Logs.js");
    const Logs=l.Log;
    const LogsData=l.LogData;

    const datetime = new Date();

    const log = new LogsData({
      time: datetime,
      authtype:auth
    });
    Logs.findOne({
      name: user
    }, function(err, foundLog) {
      if(foundLog==null){

        const record=new Logs({
          name: user,
          logdetails: log
        })

        Logs.insertMany(record, function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
      else{
        foundLog.logdetails.push(log);
        foundLog.save();
      }
    })
  }
}
