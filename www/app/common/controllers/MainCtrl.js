function MainCtrl($scope, $stateParams, $ionicPopover, Popup) {

    let menuPopover;

    $ionicPopover.fromTemplateUrl('app/partials/common/menu-popover.html', {

        scope: $scope
    }).then(function (popover) {

        menuPopover = popover;
    });

    $scope.showMenu = function ($event) {

        menuPopover.show($event);
    };

    $scope.closeMenu = function () {

        menuPopover.hide();
    };

    $scope.$on('$stateChangeSuccess', function (event, current) {

        $scope.showStoriesLink = $stateParams.domain !== undefined
    });

    $scope.openLibraryLink = function () {

        window.open('http://librairie.lapin.org/', '_system');
    };

    $scope.openArchive = function () {

        Popup.showArchive();
    };
}

angular.module('starter.controllers')
    .controller("MainCtrl", MainCtrl);
