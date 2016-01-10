(function () {
    'use strict';

    function data($http, $q, baseServiceUrl) {

        function get(url, queryParams) {
            var defered = $q.defer();

            $http.get(baseServiceUrl + '/' + url, { params: queryParams})
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function post(url, postData) {
            var defered = $q.defer();
            $http.post(baseServiceUrl + '/' + url, postData)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function put(url, putData) {
            var defered = $q.defer();

            $http.put(baseServiceUrl + '/' + url, putData)
                .then(function (response) {
                    defered.resolve(response.data);
                }, function (error) {
                    error = getErrorMessage(error);
                    defered.reject(error);
                });

            return defered.promise;
        }

        function getErrorMessage(response) {
            var error = response.data.modelState;
            if (error && error[Object.keys(error)[0]][0]) {
                error = error[Object.keys(error)[0]][0];
            }
            else {
                error = response.data;
            }

            return error;
        }

        return {
            get: get,
            post: post,
            put: put
        };
    }

    angular.module('myApp.services')
        .factory('data', ['$http', '$q', 'baseServiceUrl', data]);
}());