function DomainCtrl($scope, $rootScope, $stateParams, Domain, Strip,) {

  const STRIP_LOAD_BULK_SIZE = 5;

  var stripOffset = 0;
  var canLoadMore = true;

  var domain = $stateParams.domain;

  $scope.loading = true;
  $scope.domain = domain;
  $scope.canLoadMore = canLoadMore;
  $scope.strips = [];

  //GET INFO domain
  Domain.returnInfo(domain)
    .then(function(info) {

      $scope.info = info.data[0];
    });

  $scope.loadMore = function() {
    Strip.returnNthStrips(domain, STRIP_LOAD_BULK_SIZE, stripOffset)
      .then(function(strips) {

        $scope.loading = false;

        let stripCount = strips.data.length;
        if(stripCount == 0) {
          canLoadMore = false;

          return;
        }

        stripOffset += stripCount;

        strips.data.forEach(function(strip) {

          strip.domain = $scope.domain;
          $scope.strips.push(strip);

          stripImageLoader(strip);
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
  };

  var stripImageLoader = function(strip) {
    strip.loading = true;
    Strip.returnStripImage(domain, strip.id)
      .then(function(stripImage) {

        strip.file = stripImage.data[0].file;
        strip.loading = false;
      });
  };

  // Populate initial strips
  $scope.loadMore();
}

angular.module('starter.controllers')
  .controller('DomainCtrl', DomainCtrl);
