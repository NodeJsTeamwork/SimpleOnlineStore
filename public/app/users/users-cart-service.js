(function () {
    'use strict';

    function cartService(data) {
        var CART_URL = 'cart';

        function addToCart(productId) {
            return data.post(CART_URL + '/add', productId);
        }

        function removeFromCart(productId) {
            return data.post(CART_URL + '/remove', productId);
        }

        return {
            addToCart: addToCart,
            removeFromCart: removeFromCart
        }
    }

    angular.module('myApp.services')
        .factory('cartService', ['data', cartService])
}());