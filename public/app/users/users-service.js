(function () {
    'use strict';

    function usersService(data) {

        function updateProfile(user) {
            return data.post('profile', user);
        };

        return {
            updateProfile: updateProfile
        }
    }

    angular.module('myApp.services')
        .factory('usersService', ['data', usersService])
}());