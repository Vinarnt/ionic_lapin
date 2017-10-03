function PubCtrl($scope, Pub) {

    $scope.loading = true;

    let result = document.getElementsByClassName("popup");
    angular.element(result).addClass('popup-fullscreen');

    Pub.returnLapinPub().then(function (response) {

        $scope.pub = response.data[0];
        $scope.loading = false;

        let result = document.getElementsByClassName("popup-title");
        angular.element(result).html($scope.pub.name);
    });

    $scope.openPubLink = function () {

        window.open($scope.pub.link, '_system');
    }
}

angular.module("starter.controllers")
    .controller("PubCtrl", PubCtrl);
