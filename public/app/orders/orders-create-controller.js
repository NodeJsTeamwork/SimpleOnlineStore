(function () {
    'use strict';

    function OrdersCreateController(ordersService) {
        var vm = this;
        vm.createOrder = function (newOrder) {
            ordersService.createOrder(newOrder)
                .then(function (result) {
                    window.location.href='/orders';
                })
        }
    }

    angular.module('myApp.controllers')
        .controller('OrdersCreateController', ['ordersService', OrdersCreateController]);
}()); 