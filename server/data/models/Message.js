var mongoose = require('mongoose');

module.exports.init = function () {
  var messageSchema = new mongoose.Schema({
      username: String,
      message: String,
      userNameColor: String,
      time: String
      
  });

  var Message = mongoose.model('Message', messageSchema);
};
