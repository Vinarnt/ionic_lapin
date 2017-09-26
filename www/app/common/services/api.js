function Api($http) {

    const baseUrl = 'https://api.lapin.org/';

    return {
        get: function (route) {
            return $http.get(baseUrl + route);
        }
    };
}

angular.module('starter.services')
    .service("Api", Api);
