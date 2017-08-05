(function () {
  'use strict';

  angular
    .module('orders.services')
    .factory('PurchasedsService', PurchasedsService)
    .factory('PurchasedItemsService', PurchasedItemsService);

  PurchasedsService.$inject = ['$resource', '$log'];

  function PurchasedsService($resource, $log) {
    var Purchased = $resource('/api/placeorder');

    angular.extend(Purchased.prototype, {
      create: function () {
        var purchased = this;
        return create(purchased);
      }
    });

    return Purchased;

    function create(purchased) {      
        return purchased.$save(onSuccess, onError);
      

      // Handle successful response
      function onSuccess(purchased) {
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
  }//purchaseds service for place order ends here
    
  PurchasedItemsService.$inject = ['$resource', '$log'];

  function PurchasedItemsService($resource, $log) {
    var PurchasedItems = $resource('/api/orders/:orderId/edit');

    angular.extend(PurchasedItems.prototype, {
      create: function () {
        var purchaseditems = this;
        return create(purchaseditems);
      }
    });

    return PurchasedItems;

    function create(purchaseditems) {      
        return purchaseditems.$save(onSuccess, onError);
      

      // Handle successful response
      function onSuccess(purchaseditems) {
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
