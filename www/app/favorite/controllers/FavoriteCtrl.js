function FavoriteCtrl($ionicPlatform, $scope, Favorite) {

    $scope.favorites = null;
    $scope.loading = true;
    $scope.hasError = false;
    $scope.hasFavorites = true;

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
}

angular.module('starter.controllers')
    .controller('FavoriteCtrl', FavoriteCtrl);