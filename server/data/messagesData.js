var Message = require('mongoose').model('Message');

module.exports = {
    getAllMessages: function (callback) {
        Message.find({}, callback);
    }
};
