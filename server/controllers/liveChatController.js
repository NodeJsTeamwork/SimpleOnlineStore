var Message = require('mongoose').model('Message');

module.exports = {
    getChat: function (req, res, next) {
        Message.find()
            .exec(function (err, messages) {
                return messages;
            })
            .then(function (messages) {
                res.render('live-chat/live-chat', { currentUser: req.user, messages: messages });
            });
    }
}