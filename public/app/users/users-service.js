(function () {
    'use strict';

    function usersService(data) {
        var COMMITS_URL = 'profile';

        function updateProfile(user) {
            return data.post(COMMITS_URL, user);
        };

        return {
            updateProfile: updateProfile
        }
    }

    angular.module('myApp.services')
        .factory('usersService', ['data', usersService])
}());