(function () {
  'use strict';

  angular
    .module('orders.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('orders.userlist', {
        url: '',
        templateUrl: '/modules/orders/client/views/list-orders.client.view.html',
        controller: 'OrdersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Orders List'
        }
      })
      .state('orders.view', {
        url: '/:orderId',
        templateUrl: '/modules/orders/client/views/view-order.client.view.html',
        controller: 'OrdersController',
        controllerAs: 'vm',
        resolve: {
          orderResolve: getOrder
        },
        data: {
          pageTitle: 'Order {{ orderResolve.title }}'
        }
      })
      .state('checkout', {
        url: '/checkout',
        templateUrl: '/modules/orders/client/views/checkout.client.view.html',
        controller: 'CheckoutController',
        controllerAs: 'vm',
        data: {
          roles: ['user']
        }
      })
      .state('placeorder', {
        url: '/placeorder',
        params: {
            orderId: null
        },
        templateUrl: '/modules/orders/client/views/place-order.client.view.html',
        controller: 'PlaceOrderController',
        controllerAs: 'vm'
      });
  }

  getOrder.$inject = ['$stateParams', 'OrdersService'];

  function getOrder($stateParams, OrdersService) {
    return OrdersService.get({
      orderId: $stateParams.orderId
    }).$promise;
  }
}());
