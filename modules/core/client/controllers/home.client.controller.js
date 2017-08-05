(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', '$timeout', 'ProductsService', '$filter']
    
  function HomeController($scope, $timeout, ProductsService, $filter) {
      var vm = this;
      
      // Carousel
      $scope.slides= [
          {image: './modules/core/client/img/advertisement/20160824061005.png', text: 'sample 1'},
          {image: './modules/core/client/img/advertisement/20160824062405.png', text: 'sample 2'},
          {image: './modules/core/client/img/advertisement/20160824062500.png', text: 'sample 3'},
          {image: './modules/core/client/img/advertisement/20160824062545.png', text: 'sample 3'}
      ]
      
      // New arrivals/deals
      vm.newProducts = ProductsService.query();      
      vm.dealProducts = ProductsService.query();
      
      // Bakc to top
      $scope.backToTop = function(){
          $('html, body').animate({scrollTop: 0}, 50);
      }
  }
}());
