(function () {
    'use strict';

    function UsersController(usersService) {
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
        .controller('UsersController', ['usersService', UsersController]);
}()); 