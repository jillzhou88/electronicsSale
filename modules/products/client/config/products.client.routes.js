(function () {
  'use strict';

  angular
    .module('products.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('products', {
        abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('products.list', {
        url: '/category/:category',
        templateUrl: '/modules/products/client/views/list-products.client.view.html',
        controller: 'ProductsListController',
        controllerAs: 'vm'
      })
    .state('products.search', {
        url: '/search',
        templateUrl: '/modules/products/client/views/search-products.client.view.html',
        controller: 'ProductsSearchController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Search Result'
        }
      })
//      .state('products.search', {
//        url: '',
//        templateUrl: '/modules/products/client/views/search-products.client.view.html',
//        controller: 'ProductsSearchController',
//        controllerAs: 'vm',
//        data: {
//          pageTitle: 'Search Result'
//        }
//      })
      .state('products.view', {
        url: '/:productId',
        templateUrl: '/modules/products/client/views/view-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: getProduct
        },
        data: {
          pageTitle: 'Product {{ productResolve.title }}'
        }
      });
  }

  getProduct.$inject = ['$stateParams', 'ProductsService'];

  function getProduct($stateParams, ProductsService) {
    return ProductsService.get({
      productId: $stateParams.productId
    }).$promise;
  }
    
    
}());
