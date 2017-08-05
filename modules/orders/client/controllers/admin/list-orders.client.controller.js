(function () {
  'use strict';

  angular
    .module('orders.admin')
    .controller('OrdersAdminListController', OrdersAdminListController);

  OrdersAdminListController.$inject = ['OrdersService', '$filter'];

  function OrdersAdminListController(OrdersService, $filter) {
    var vm = this;
      
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    OrdersService.query(function(data){
        vm.orders = data;
        vm.buildPager();
    });
      
    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.orders, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
