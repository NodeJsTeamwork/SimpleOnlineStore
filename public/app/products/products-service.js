(function () {
    'use strict';

    function productsService(data) {
        var COMMITS_URL = 'products';

        function createProduct(product) {
            return data.post(COMMITS_URL, product);
        };

        return {
            createProduct: createProduct
        }
    }

    angular.module('myApp.services')
        .factory('productsService', ['data', productsService])
}());