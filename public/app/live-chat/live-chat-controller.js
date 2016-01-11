(function () {
    'use strict';

    const USER_NAME = $('#currentUsername').text() || 'guest',
        socket = io();
        
        
        var msgBox = $('#messagesBox');
        msgBox.animate({ scrollTop: msgBox.prop("scrollHeight") - msgBox.height() }, 1);

    function LiveChatController(liveChatService) {
        var vm = this;

        socket.on('chat message', function (msg) {
            liveChatService.displayMessage(msg);
        });
        
        
        vm.sendMessage = function ($event) {
            var keyCode = $event.which || $event.keyCode;
            
            if (keyCode == 13) {
                var msg = vm.messageToSend;

                var username = USER_NAME;

                if (msg.trim() !== '') {
                    publish(msg, username);
                }

                vm.messageToSend = '';
            }
        }

        var publish = function (message, username) {
            message = _.escape(message);
            var userNameColor = '',
                date = new Date(),
                minutes = date.getMinutes().toString(),
                hours = date.getHours().toString();
                
            minutes = minutes.length == 1 ? '0' + minutes : minutes;

            hours = hours.length == 1 ? '0' + hours : hours;

            var time = hours + ':' + minutes;

            var messageObj = {
                username: username,
                message: message,
                userNameColor: userNameColor,
                time: time
            };

            socket.emit('chat message', messageObj);
        };
    }

    angular.module('myApp.controllers')
        .controller('LiveChatController', ['liveChatService', LiveChatController]);
} ()); 