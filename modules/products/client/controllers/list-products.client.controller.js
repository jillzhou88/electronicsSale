(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsListController', ProductsListController);

  ProductsListController.$inject = ['ProductsService', 'UrlService', '$stateParams'];

  function ProductsListController(ProductsService, UrlService, $stateParams) {
    var vm = this;
    
    var query = {};
    query.category = $stateParams.category;

    vm.products = ProductsService.query(query);
  }
}());
