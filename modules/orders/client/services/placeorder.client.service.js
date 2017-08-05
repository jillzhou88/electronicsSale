(function () {
  'use strict';

  angular
    .module('orders.services')
    .factory('PlaceOrdersService', PlaceOrdersService);

  PlaceOrdersService.$inject = ['$resource', '$log'];

  function PlaceOrdersService($resource, $log) {
    var newOrder = $resource('/api/checkout');

    angular.extend(newOrder.prototype, {
      create: function () {
        var neworder = this;
        return create(neworder);
      }
    });

    return newOrder;

    function create(neworder) {      
        return neworder.$save(onSuccess, onError);
      

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
