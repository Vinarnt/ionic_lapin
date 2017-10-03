function Popup($state, $ionicPopup) {

    return {
        showPub: function () {

            let pubPopup = $ionicPopup.show({
                title: 'Chargement en cours',
                templateUrl: 'app/pub/views/popup.html',
                buttons: [{
                    text: 'Fermer',
                    type: 'button-default'
                }]
            });

            pubPopup.then(function () {
                $state.go('^');
            });

            return pubPopup;
        },
        showArchive: function () {

            let pubPopup = $ionicPopup.show({
                title: 'Archive',
                template: '<div class="inline-center">Pas encore disponible</div>',
                buttons: [{
                    text: 'Fermer',
                    type: 'button-default'
                }]
            });

            return pubPopup;
        }
    };
}

angular.module('starter.services')
    .service('Popup', Popup);
