(function () {
    'use strict';

    function productsService(data) {
        var PRODUCTS_URL = 'products';

        function createProduct(product) {
            return data.post(PRODUCTS_URL + '/admin/add', product);
        };

        return {
            createProduct: createProduct
        }
    }

    angular.module('myApp.services')
        .factory('productsService', ['data', productsService])
}());