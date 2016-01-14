(function () {
    'use strict';

    function CartController(cartService) {
        var vm = this;
        var currentPath = window.location.pathname;
        var itemId = currentPath.substring(currentPath.lastIndexOf('/') + 1);

        vm.addToCart = function () {
            var vm = this;
            var itemToAdd = {
                itemId: itemId
            };
            cartService.addToCart(itemToAdd)
                .then(function (result) {
                    window.location.href = '/cart';
                }, function (err) {
                    console.log(err);
                })
        };

        vm.removeFromCart = function () {
            var vm = this;
            var itemToRemove = {
                itemId: itemId
            };
            cartService.removeFromCart(itemToRemove)
                .then(function (result) {
                    window.location.href = '/cart';
                }, function (err) {
                    console.log(err);
                })
        };
    }

    angular.module('myApp.controllers')
        .controller('CartController', ['cartService', CartController]);
}());