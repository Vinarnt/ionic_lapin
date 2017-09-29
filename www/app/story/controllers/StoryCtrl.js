function StoryCtrl($rootScope, $scope, $stateParams, $ionicActionSheet, $cordovaToast, Story, Strip, Favorite) {

    const STRIPS_LOAD_BULK_SIZE = 10;

    let domainName = $stateParams.domain;
    let storyId = $stateParams.storyId;

    $rootScope.domain = domainName;
    $scope.canLoadMore = true;
    $scope.strips = [];

    let lastStripId = 0;

    Story.returnStory(domainName, storyId)
        .then(function (response) {

            $scope.story = response.data[0];
        });

    let stripImageLoader = function (strip) {

        strip.loading = true;

        Strip.returnStripImage(domainName, strip.id)
            .then(function (stripImage) {

                strip.loading = false;
                strip.file = stripImage.data[0].file;
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

        Story.returnStripsByStory(domainName, storyId, STRIPS_LOAD_BULK_SIZE, lastStripId)
            .then(function (response) {

                $scope.strips = $scope.strips.concat(response.data);
                $scope.canLoadMore = response.data.length === STRIPS_LOAD_BULK_SIZE;

                response.data.forEach(function (strip) {
                    stripImageLoader(strip);
                });

                lastStripId = parseInt(response.data[response.data.length - 1].id) + 1;

                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
    };

}

angular.module('starter.controllers')
    .controller('StoryCtrl', StoryCtrl);