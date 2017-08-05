(function () {
  'use strict';

  angular
    .module('orders')
    .controller('OrdersController', OrdersController);

  OrdersController.$inject = ['$scope', 'orderResolve', 'Authentication'];

  function OrdersController($scope, order, Authentication) {
    var vm = this;

    vm.order = order;
    vm.authentication = Authentication;

  }
}());
