function FavoriteCtrl($ionicPlatform, $scope, $ionicActionSheet, $cordovaToast, Favorite) {

    $scope.favorites = null;
    $scope.loading = true;
    $scope.hasError = false;
    $scope.hasFavorites = false;

    console.log('Init favorite controller');
    $ionicPlatform.ready(function () {

        Favorite.getFavorites().then(
            function (value) {

                $scope.favorites = value;
                $scope.hasFavorites = !angular.equals(value, {});
                $scope.loading = false;
            },
            function (error) {

                $scope.hasError = true;
                $scope.loading = false;
            }
        );
    });

    $scope.onHold = function(stripId) {

        let strip = $scope.favorites[stripId];

        $ionicActionSheet.show({
            buttons: [
                {text: 'Supprimer des favoris'}
            ],
            cancelText: 'Retour',
            buttonClicked: function (index) {

                switch (index) {

                    case 0:

                        Favorite.removeFavorite(stripId).then(function () {

                            $cordovaToast.showShortBottom(`Strip ${strip.title} supprimé des favoris`);
                        }, function (error) {

                            $cordovaToast.showShortBottom(`Erreur lors de la supréssion du strip ${strip.title}`)
                        });

                        break;
                }

                return true;
            }
        });
    };
}

angular.module('starter.controllers')
    .controller('FavoriteCtrl', FavoriteCtrl);