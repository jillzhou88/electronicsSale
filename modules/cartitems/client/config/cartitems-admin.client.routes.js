(function () {
  'use strict';

  angular
    .module('cartitems.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.cartitems', {
        abstract: true,
        url: '/cartitems',
        template: '<ui-view/>'
      })
      .state('admin.cartitems.list', {
        url: '',
        templateUrl: '/modules/cartitems/client/views/admin/list-cartitems.client.view.html',
        controller: 'CartitemsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.cartitems.create', {
        url: '/create',
        templateUrl: '/modules/cartitems/client/views/admin/form-cartitem.client.view.html',
        controller: 'CartitemsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          cartitemResolve: newCartitem
        }
      })
      .state('admin.cartitems.add', {
        url: '/add',
        controller: 'CartitemsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          cartitemResolve: newCartitem
        }
      })
      .state('admin.cartitems.edit', {
        url: '/:cartitemId/edit',
        templateUrl: '/modules/cartitems/client/views/admin/form-cartitem.client.view.html',
        controller: 'CartitemsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          cartitemResolve: getCartitem
        }
      });
  }

  getCartitem.$inject = ['$stateParams', 'CartitemsService'];

  function getCartitem($stateParams, CartitemsService) {
    return CartitemsService.get({
      cartitemId: $stateParams.cartitemId
    }).$promise;
  }

  newCartitem.$inject = ['CartitemsService'];

  function newCartitem(CartitemsService) {
    return new CartitemsService();
  }
}());
