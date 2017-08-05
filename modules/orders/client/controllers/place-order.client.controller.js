(function(){
  'use strict';
    
  angular
    .module('cartitems')
    .controller('PlaceOrderController', PlaceOrderController);
    
  PlaceOrderController.$inject = ['$scope', '$stateParams', 'Notification', 'CartitemsService', 'PurchasedsService', 'PlaceOrdersService', 'Authentication','AddressesService'];
    
  function PlaceOrderController($scope, $stateParams, Notification, CartitemsService, PurchasedsService, PlaceOrdersService, Authentication, AddressesService){
    var vm = this;
    
    vm.user = Authentication.user;
    vm.order = $stateParams.orderId;
    vm.cartitems = CartitemsService.query();
    
    // move cartitems into purchased collection   
    vm.cartitems.$promise.then(function(data){
        for(var i = 0; i < data.length; i++){
            var newPurchased = new PurchasedsService();
            newPurchased.order = vm.order;
            newPurchased.product = data[i].product._id;
            newPurchased.qty = data[i].qty;

            newPurchased.create()
                        .then(successCallback)
                        .catch(errorCallback);

            function errorCallback(res) {
                Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Order save error!' });
            }

            // delete cartitems
            data[i].$remove();
        }       
    });
  }    
}());