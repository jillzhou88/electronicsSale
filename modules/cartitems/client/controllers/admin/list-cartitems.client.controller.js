(function () {
  'use strict';

  angular
    .module('cartitems.admin')
    .controller('CartitemsAdminListController', CartitemsAdminListController);

  CartitemsAdminListController.$inject = ['CartitemsService', '$filter'];

  function CartitemsAdminListController(CartitemsService, $filter) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    
    CartitemsService.query(function(data){
        vm.cartitems = data;
        vm.buildPager();
        console.log(data);
    });
      
    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.cartitems, {
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
