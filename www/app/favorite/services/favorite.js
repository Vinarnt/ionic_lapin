function Favorite($ionicPlatform, $cordovaPreferences, $q) {

    const KEY = 'favorites';

    let favorites = null;

    return {

        addFavorite: function (strip) {

            favorites[strip.id] = strip;

            return $cordovaPreferences.store(KEY, favorites)
                .error(function (error) {

                    console.warn("Unable to add favorite. " + error);
                });
        },
        removeFavorite: function (stripId) {

            delete favorites[stripId];

            return $cordovaPreferences.store(KEY, favorites)
                .error(function (error) {

                    console.warn("Unable to remove favorite. " + error);
                });
        },
        getFavorites: function () {

            let deferred = $q.defer();
            console.log("Get favorites");

            if (favorites === null) {

                favorites = {};

                $cordovaPreferences.fetch(KEY)
                    .success(function (value) {

                        for(let key in value) {
                            console.log(key + " -> " + value[key]);
                        }

                        if(value !== "")
                            favorites = value;

                        deferred.resolve(favorites);
                    })
                    .error(function (error) {

                        console.warn("Unable to fetch favorites. " + error);
                        deferred.reject(error);
                    });
            } else {

                console.log("Get cached favorites");
                deferred.resolve(favorites);
            }

            return deferred.promise;
        },
        clear: function () {

            favorites = {};
            $cordovaPreferences.remove(KEY)
                .error(function (error) {

                    console.warn("Unable to clear favorites. " + error);
                });
        }
    };
}

angular.module('starter.services')
    .service('Favorite', Favorite)
    .run(function ($ionicPlatform, Favorite) {
        $ionicPlatform.ready(function () {

            // Favorite.clear();
            Favorite.getFavorites();
        });
    });