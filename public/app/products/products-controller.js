(function () {
    'use strict';

    function ProductsController(notifier, $location, productsService) {
    	var vm = this;

    	vm.createProduct = function (newProduct) {
    		productsService.createProduct(newProduct)
    			.then(function (result) {
    				window.location.href = '/';
                    notifier.success("Product added successfully!");
    			})
    	}
    }

    angular.module('myApp.controllers')
        .controller('ProductsController', ['notifier', '$location', 'productsService', ProductsController]);
}()); 