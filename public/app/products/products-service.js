(function () {
    'use strict';

    function productsService(data) {
        var PRODUCTS_URL = 'admin';

        function createProduct(product) {
            return data.post(PRODUCTS_URL + '/products/add', product);
        }

        function addToCart(productId) {
            return data.post(PRODUCTS_URL + '/cart/add', productId);
        }

        return {
            createProduct: createProduct,
            addToCart: addToCart
        }
    }

    angular.module('myApp.services')
        .factory('productsService', ['data', productsService])
}());