var socketio = require('socket.io'),
    Message = require('mongoose').model('Message');

module.exports.listen = function (app) {
    io = socketio.listen(app);
    io.on('connection', function (socket) {
        socket.on('chat message', function (msg) {
            Message.create(msg, function () {
                io.emit('chat message', msg);
            });
        });
    });

    return io;
}
