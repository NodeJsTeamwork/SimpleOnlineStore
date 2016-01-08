(function () {
    'use strict';

    function productsService(data) {
        var PRODUCTS_URL = 'admin';

        function createProduct(product) {
            return data.post(PRODUCTS_URL + '/products/add', product);
        };

        return {
            createProduct: createProduct
        }
    }

    angular.module('myApp.services')
        .factory('productsService', ['data', productsService])
}());