(function () {
    'use strict';

    function cartService(data) {
        var PRODUCTS_URL = 'admin';

        function addToCart(productId) {
            return data.post(PRODUCTS_URL + '/cart/add', productId);
        }

        function removeFromCart(productId) {
            return data.post(PRODUCTS_URL + '/cart/remove', productId);
        }

        return {
            addToCart: addToCart,
            removeFromCart:removeFromCart
        }
    }

    angular.module('myApp.services')
        .factory('cartService', ['data', cartService])
}());