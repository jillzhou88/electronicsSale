(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsSearchController', ProductsSearchController);

  ProductsSearchController.$inject = ['ProductsSearch', 'UrlService'];

  function ProductsSearchController(ProductsSearch, UrlService) {
      var vm = this;
      
      //search
      var query = {};
      vm.text = UrlService.getQueryStringVar('search');
      
      query.text = vm.text;      
     
      vm.products = ProductsSearch.query(query);
  }
}());
