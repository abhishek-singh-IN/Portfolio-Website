var mongoose = require('mongoose');
var path = require('path');

const LogDataSchema = {
  time: String,
  authtype:String
};

const logsSchema = {
  name: String,
  logdetails: [LogDataSchema]
};

module.exports ={
  Log:mongoose.model("Log", logsSchema),
  LogData:mongoose.model("LogData", LogDataSchema)
}
