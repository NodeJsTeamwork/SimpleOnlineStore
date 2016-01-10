(function () {
    'use strict';

    function AddCartController(productsService) {
        var vm = this;
        var currentPath = window.location.search;
        var itemId = currentPath.substring(currentPath.lastIndexOf('=') + 1);
        console.log(itemId);

        vm.addToCart = function () {
            var vm = this;
            var itemToAdd = {
              itemId:itemId
            };
            productsService.addToCart(itemToAdd)
                .then(function (result) {
                    console.log('added to cart!');
                }, function (err) {
                    console.log(err);
                })
        };
    }

    angular.module('myApp.controllers')
        .controller('AddCartController', ['productsService', AddCartController]);
}());