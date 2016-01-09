(function () {
    'use strict';

    function UsersUpdateController(usersService) {
    	var vm = this;
        
        vm.updateProfile = function (user) {
            console.log(user);
            usersService.updateProfile(user)
    			.then(function (result) {
    				window.location.reload();
    			})
        }
    }

    angular.module('myApp.controllers')
        .controller('UsersUpdateController', ['usersService', UsersUpdateController]);
}()); 