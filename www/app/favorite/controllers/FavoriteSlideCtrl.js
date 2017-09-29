function FavoriteSlideCtrl($rootScope, $scope, $stateParams, Favorite) {

    console.log('Init fav slide');
    console.log($stateParams.stripId);

    $rootScope.domain = null;

    $scope.strips = [];

    // Watch slides array for initial slides loading and set initial slide active index when loaded
    let slidesWatcher = $scope.$watch("slider.slides", function () {

        let slider = $scope.slider;
        let slideCount;

        // Slide to initial slide when slides are loaded in the slider
        if (slider !== undefined && (slideCount = slider.slides.length) > 0) {

            //Get the index of the queried strip
            let initialIndex;
            for (let i = 0; i < slideCount; i++) {

                let strip = $scope.strips[i];

                if (strip.id === $stateParams.stripId) {

                    initialIndex = i;
                    break;
                }
            }
            slider.slideTo(initialIndex, 0);

            // Unwatch
            slidesWatcher();
        }
    });

    $scope.sliderOptions = {
        zoom: true,
        pagination: false,
        direction: 'horizontal'
    };

    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        $scope.slider = data.slider;
    });

    Favorite.getFavorites().then(function (favorites) {

        for (let key in favorites)
            $scope.strips.push(favorites[key])
    });
}

angular.module('starter.controllers')
    .controller('FavoriteSlideCtrl', FavoriteSlideCtrl);
