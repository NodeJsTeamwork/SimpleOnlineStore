(function () {
    'use strict';

    function ProductsController() {
        var vm = this;
        var currentPath = window.location.pathname;
        
        vm.request = {};
        vm.request.page = getParameterByName('page') ? (+getParameterByName('page')) : 1;
        vm.request.pageSize = getParameterByName('pageSize') ? (+getParameterByName('pageSize')) : 10;
        vm.request.sortBy = getParameterByName('sortBy') ? getParameterByName('sortBy') : 'price';
        vm.request.type = getParameterByName('type') ? getParameterByName('type') : 'ascending';
        vm.request.userId = getParameterByName('userId') ? getParameterByName('userId') : null;
        
        vm.prevPage = function () {
            if (vm.request.page == 1) {
                return;
            }

            vm.request.page--;
            vm.filterProducts();
        }

        vm.nextPage = function () {
            if (!vm.products || vm.products.length == 0) {
                return;
            }

            vm.request.page++;
            vm.filterProducts();
        }

        vm.filterProducts = function () {
            var newLocation = currentPath
                + '?page=' + vm.request.page
                + '&pageSize=' + vm.request.pageSize
                + '&sortBy=' + vm.request.sortBy
                + '&type=' + vm.request.type;
                
            if (vm.request.userId) {
                newLocation = newLocation + '&userId=' + vm.request.userId;
            }
                
            window.location.href = newLocation;              
        };
        
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }

    angular.module('myApp.controllers')
        .controller('ProductsController', [ProductsController]);
}());