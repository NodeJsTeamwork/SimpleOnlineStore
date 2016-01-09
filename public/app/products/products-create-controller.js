(function () {
    'use strict';

    function ProductsCreateController($location, productsService) {
    	var vm = this;

    	vm.createProduct = function (newProduct) {
    		productsService.createProduct(newProduct)
    			.then(function (result) {
    				window.location.href = '/';
    			})
    	}
    }

    angular.module('myApp.controllers')
        .controller('ProductsCreateController', ['$location', 'productsService', ProductsCreateController]);
}()); 