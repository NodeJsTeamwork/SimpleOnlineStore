module.exports = function (messagesData) {
    var controller = {
        getChat: function (req, res, next) {
            messagesData.getAllMessages(function (err, messages) {
                res.render('live-chat/live-chat', { currentUser: req.user, messages: messages });
            });
            
            // Message.find()
            //     .exec(function (err, messages) {
            //         return messages;
            //     })
            //     .then(function (messages) {
            //         res.render('live-chat/live-chat', { currentUser: req.user, messages: messages });
            //     });
        }
    };
    
    return controller;
};