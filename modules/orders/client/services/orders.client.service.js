(function () {
  'use strict';

  angular
    .module('orders.services')
    .factory('OrdersService', OrdersService);

  OrdersService.$inject = ['$resource', '$log'];

  function OrdersService($resource, $log) {
    var Order = $resource('/api/orders/:orderId', {
      orderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Order.prototype, {
      createOrUpdate: function () {
        var order = this;
        return createOrUpdate(order);
      }
    });

    return Order;

    function createOrUpdate(order) {
      if (order._id) {
        return order.$update(onSuccess, onError);
      } else {
        return order.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(order) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
