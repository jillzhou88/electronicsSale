(function () {
  'use strict';

  angular
    .module('users')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$scope', 'Authentication', 'orderResolve', '$resource'];

  function OrdersController($scope, Authentication, order, $resource) {
    var vm = this;

    vm.order = order;
      console.log(vm.order);
    vm.user = Authentication.user;
      
    // get purchased items list
    var PurchasedItems = $resource('/api/settings/orders/:orderId/view', {orderId: vm.order._id});
    vm.items = PurchasedItems.query({order: vm.order._id});
      console.log(vm.items);
  }
}());
