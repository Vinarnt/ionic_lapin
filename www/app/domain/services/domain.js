function Domain(Api) {

    console.log("Init domain service");

    return {
        returnDomain: function () {
            return Api.get('infoGeneral');
        },
        returnInfo: function (domain) {
            return Api.get(`info/${domain}`);
        }
    };
}

angular.module('starter.services')
    .service("Domain", Domain);
