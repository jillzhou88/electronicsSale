(function () {
  'use strict';

  angular
    .module('orders.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.orders', {
        abstract: true,
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('admin.orders.list', {
        url: '',
        templateUrl: '/modules/orders/client/views/admin/list-orders.client.view.html',
        controller: 'OrdersAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.orders.create', {
        url: '/create',
        templateUrl: '/modules/orders/client/views/admin/form-order.client.view.html',
        controller: 'OrdersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          orderResolve: newOrder
        }
      })
      .state('admin.orders.edit', {
        url: '/:orderId/edit',
        templateUrl: '/modules/orders/client/views/admin/form-order.client.view.html',
        controller: 'OrdersAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          orderResolve: getOrder
        }
      });
  }

  getOrder.$inject = ['$stateParams', 'OrdersService'];

  function getOrder($stateParams, OrdersService) {
    return OrdersService.get({
      orderId: $stateParams.orderId
    }).$promise;
  }

  newOrder.$inject = ['OrdersService'];

  function newOrder(OrdersService) {
    return new OrdersService();
  }
}());
