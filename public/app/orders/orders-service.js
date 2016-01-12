(function () {
    'use strict';

    function ordersService(data) {

        function createOrder(product) {
            return data.post('orders', product);
        }

        return {
            createOrder: createOrder
        }
    }

    angular.module('myApp.services')
        .factory('ordersService', ['data', ordersService])
}());