(function () {
    'use strict';

    angular.module('myApp.services', []);
    angular.module('myApp.directives', []);
    angular.module('myApp.controllers', ['myApp.services']);
    angular.module('myApp', ['myApp.controllers', 'myApp.directives', 'myApp.services'])
    	.value('toastr', toastr)
        .constant('baseServiceUrl', 'http://localhost:3030');
}());