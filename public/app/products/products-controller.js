(function () {
    'use strict';

    function ProductsController($location, productsService) {
    	var vm = this;

    	vm.createProduct = function (newProduct) {
    		productsService.createProduct(newProduct)
    			.then(function (result) {
    				window.location.href = '/';
    			})
    	}
    }

    angular.module('myApp.controllers')
        .controller('ProductsController', ['$location', 'productsService', ProductsController]);
}()); 