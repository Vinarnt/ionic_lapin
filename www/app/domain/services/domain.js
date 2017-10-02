angular.module('starter.services')
    .factory("Domain", function ($http, Api) {

        return {
            returnDomain: function () {
                return $http.get(`${Api.baseUrl}infoGeneral`);
            },
            returnInfo: function (domain) {
                return $http.get(`${Api.baseUrl}info/${domain}`);
            }
        };
    });
