(function () {
  'use strict';

  angular
    .module('users.services')
    .factory('AddressesService', AddressesService);
    

  AddressesService.$inject = ['$resource', '$log'];

  function AddressesService($resource, $log) {
    var Address = $resource('/api/users/address/:addressId', {
      addressId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Address.prototype, {
      createOrUpdate: function () {
        var address = this;
        return createOrUpdate(address);
      }
    });

    return Address;

    function createOrUpdate(address) {
      if (address._id) {
        return address.$update(onSuccess, onError);
      } else {
        return address.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(address) {
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
  } // address service ends
    
}());
