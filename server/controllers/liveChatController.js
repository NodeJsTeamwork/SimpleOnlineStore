module.exports = function (messagesData) {
    var controller = {
        getChat: function (req, res, next) {
            messagesData.getAllMessages(function (err, messages) {
                res.render('live-chat/live-chat', { currentUser: req.user, messages: messages });
            });
        }
    };
    
    return controller;
};