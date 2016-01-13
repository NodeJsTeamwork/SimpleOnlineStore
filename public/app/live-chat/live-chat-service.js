(function () {
    'use strict';

    function liveChatService() {
        var messagesBox = $('#messagesBox');

        function displayMessage(messageObj) {

        var root = $('#messagesBox');
        
        var entireMessage =
            '<div id="holemsg"><span class="chat-username">' + messageObj.username + ': </span>' + '<span id="textmessage">' +
            messageObj.message + '</span><span class="chat-date">' + messageObj.time + '</span>';

        root.append(entireMessage);

        var element = document.getElementById("messagesBox");
        element.scrollTop = element.scrollHeight;
    };
        
        return {
            displayMessage: displayMessage
        }
    }

    angular.module('myApp.services')
        .factory('liveChatService', [liveChatService])
}());