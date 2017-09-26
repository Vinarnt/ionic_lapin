angular.module('starter.services')
    .factory("Strip", function ($http, CacheFactory, Api) {

        return {
            returnNthStrips: function (domain, number, offset) {
                offset = typeof offset !== 'undefined' ? offset : 0;

                return Api.get(`strips/${domain}/${number}/${offset}`);
            },
            returnAllStrips: function (domain) {
                return Api.get(`strips/${domain}`);
            },
            returnStripImage: function (domain, id) {
                return Api.get(`strips/image/${domain}/${id}`);
            }
        };
    });
