(function () {
  'use strict';

  angular
    .module('cartitems.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cartitems', {
        abstract: true,
        url: '/cartitems',
        template: '<ui-view/>'
      })
      .state('cartitems.list', {
        url: '',
        templateUrl: '/modules/cartitems/client/views/list-cartitems.client.view.html',
        controller: 'CartitemsListController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        },
      })
      .state('cartitems.delete', {
        url: '',
        templateUrl: '/modules/cartitems/client/views/cartitem-delete.client.view.html',
        controller: '',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      });
//      .state('checkout', {
//        url: '/checkout',
//        templateUrl: '/modules/orders/client/views/checkout.client.view.html',
//        controller: 'CheckoutController',
//        controllerAs: 'vm',
//        data: {
//          roles: ['user']
//        },
//      });
  }

//  getCartitem.$inject = ['$stateParams', 'CartitemsService'];
//
//  function getCartitem($stateParams, CartitemsService) {
//    return CartitemsService.get({
//      cartitemId: $stateParams.cartitemId
//    }).$promise;
//  }
//
//  newCartitem.$inject = ['CartitemsService'];
//
//  function newCartitem(CartitemsService) {
//    return new CartitemsService();
//  }
  
}());
