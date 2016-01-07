(function () {
    'use strict';
    
     const CHANEL_NAME = 'online_support',
     USER_NAME = $('#username').val() || 'guest';

     var pubNub = PUBNUB.init({
        subscribe_key: 'sub-c-a9f92646-8baf-11e5-a2e7-0619f8945a4f',
        publish_key: 'pub-c-5cf82aac-7a6e-48cb-96e8-95e9a286faa7',
        ssl: false
        });

    
    function LiveChatController(liveChatService) {
         pubNub.subscribe({
            channel: CHANEL_NAME,
            message: function (message) {
                liveChatService.displayMessage(message);
            },
            error: function (error) {
                toastr.error('Something went wrong!' + error);
            }
        });

        pubNub.history({
            channel: CHANEL_NAME,
            count: 100,
            callback: function (messages) {
                messages = messages[0];
                for (var i = 0; i < messages.length; i++) {
                    liveChatService.displayMessage(messages[i]);
                }
            }
        });
        $(document).keypress(function (key) {

            if (key.which == 13) {
                var msg = $('#messageToSend');

                var username = USER_NAME; //localStorage.getItem(USER_NAME);

                if (msg.val().trim() !== '') {

                    publish(msg.val(), username);
                }

                msg.val('');
            }
        });
        
        var publish = function (message, username) {
        message = _.escape(message);
        var userNameColor = getRandomColor();
        
        var messageObj = {
            username: username,
            message: message,
            userNameColor: userNameColor
        };

        pubNub.publish({
            channel: CHANEL_NAME,
            message: messageObj,
            callback: function (m) {
                //console.log(m);
            }
        });
        };
        
        var getRandomColor = function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
        };
        
        
    }
    
    
    angular.module('myApp.controllers')
        .controller('LiveChatController', ['liveChatService', LiveChatController]);
}()); 