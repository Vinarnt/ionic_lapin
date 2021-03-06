function DomainCtrl($rootScope, $scope, $stateParams, $ionicActionSheet, $cordovaToast, Domain, Strip, Favorite) {

    const STRIPS_LOAD_BULK_SIZE = 10;

    let domainName = $stateParams.domain;
    let lastStripId = 0;

    $scope.loading = true;
    $rootScope.domain = domainName;
    $scope.canLoadMore = true;
    $scope.strips = [];

    //GET INFO domain
    Domain.returnInfo(domainName)
        .then(function (response) {

            $scope.info = response.data[0];
            $scope.loading = false;
        });

    let stripImageLoader = function (strip) {

        strip.loading = true;

        Strip.returnStripImage(domainName, strip.id)
            .then(function (stripImage) {

                strip.file = stripImage.data[0].file;
                strip.loading = false;
            });
    };

    $scope.onHold = function (stripId) {

        $ionicActionSheet.show({
            buttons: [
                {text: 'Ajouter aux favoris'}
            ],
            cancelText: 'Retour',
            buttonClicked: function (index) {

                switch (index) {

                    case 0:

                        for (let i = 0; i < $scope.strips.length; i++) {

                            let strip = $scope.strips[i];

                            if (parseInt(strip.id) === stripId) {

                                Favorite.addFavorite(strip).then(
                                    function () {

                                        $cordovaToast.showShortBottom(`Strip ${strip.title} ajouté aux favoris`);
                                    },
                                    function (error) {

                                        $cordovaToast.showShortBottom(`Erreur lors de l'ajout du strip ${strip.title} aux favoris`)
                                    }
                                );

                                break;
                            }
                        }

                        break;
                }

                return true;
            }
        });
    };

    $scope.loadMore = function () {

        Strip.returnNthStrips(domainName, STRIPS_LOAD_BULK_SIZE, lastStripId)
            .then(function (response) {

                $scope.strips = $scope.strips.concat(response.data);
                $scope.canLoadMore = response.data.length === STRIPS_LOAD_BULK_SIZE;

                response.data.forEach(function (strip) {

                    stripImageLoader(strip);
                });

                lastStripId += parseInt($scope.strips[$scope.strips.length - 1].id) + 1;

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };
}

angular.module('starter.controllers')
    .controller('DomainCtrl', DomainCtrl);
