(function () {
  'use strict';

  angular
    .module('users.services')
    .factory('PaymentsService', PaymentsService);
    

  PaymentsService.$inject = ['$resource', '$log'];

  function PaymentsService($resource, $log) {
    var Payment = $resource('/api/users/payment/:paymentId', {
      paymentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Payment.prototype, {
      createOrUpdate: function () {
        var payment = this;
        return createOrUpdate(payment);
      }
    });

    return Payment;

    function createOrUpdate(payment) {
      if (payment._id) {
        return payment.$update(onSuccess, onError);
      } else {
        return payment.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(payment) {
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
  } // payment service ends
    
}());
