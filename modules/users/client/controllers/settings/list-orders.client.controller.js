(function () {
  'use strict';

  angular
    .module('users')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['OrdersService', 'Authentication'];

  function OrdersListController(OrdersService, Authentication) {
    var vm = this;
      
    vm.user = Authentication.user;
    vm.orders = OrdersService.query({user: vm.user._id});
//      console.log(vm.orders);
  }
}());
