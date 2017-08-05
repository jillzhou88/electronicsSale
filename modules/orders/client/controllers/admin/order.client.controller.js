(function () {
  'use strict';

  angular
    .module('orders.admin')
    .controller('OrdersAdminController', OrdersAdminController);

  OrdersAdminController.$inject = ['$scope', '$state', '$window', 'orderResolve', 'Authentication', 'Notification', '$resource'];

  function OrdersAdminController($scope, $state, $window, order, Authentication, Notification, $resource) {
    var vm = this;

    vm.order = order;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.changeStatus = changeStatus;
    vm.cancel = cancel;
      
    // get purchased items list
    var PurchasedItems = $resource('/api/orders/:orderId/edit', {orderId: vm.order._id});
    vm.items = PurchasedItems.query({order: vm.order._id});

    // Remove existing Order
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.order.$remove(function() {
          $state.go('admin.orders.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Order deleted successfully!' });
        });
      }
    }

    // change order status
    function changeStatus() {
      if(vm.order.order_status == 'placed'){
          vm.order.order_status = 'ready';
      }
      else if(vm.order.order_status == 'ready'){
          vm.order.order_status = 'shipout';
      }
      else if(vm.order.order_status == 'shipout'){
          vm.order.order_status = 'archive';
      }
    
      vm.order.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {        
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Order status changed successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Order save error!' });
      }
    }
      
    // cancel order
    function cancel(){
        vm.order.order_status = "cancel";
        
        vm.order.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {        
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Order status changed successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Order save error!' });
      }
    }
  }
}());
