(function(){
  'use strict';
    
  angular
    .module('cartitems')
    .controller('CheckoutController', CheckoutController);
    
  CheckoutController.$inject = ['$scope', '$state', 'Notification', 'CartitemsService', 'PlaceOrdersService', 'Authentication','AddressesService'];
    
  function CheckoutController($scope, $state, Notification, CartitemsService, PlaceOrdersService, Authentication, AddressesService){
    var vm = this;
    
    vm.user = Authentication.user;
    vm.cartitems = CartitemsService.query();
    vm.addressList = AddressesService.query();
    vm.changeAddress = changeAddress;
    $scope.getRandomId = getRandomId;
    vm.orderId = getRandomId();
    vm.placeOrder = placeOrder;
    
    // set default address as shipping address 
    AddressesService.query({isPrimary: true})
        .$promise
        .then(function(data){
            vm.shippingAddress = data[0];
    });
    
    // change address
    function changeAddress(addressId){
//        console.log(addressId);
        AddressesService.get({addressId: addressId})
          .$promise
          .then(function(data){
            vm.shippingAddress = data;
        })
    }
    
    // order summary  
    vm.shipping = 0;
    vm.Total = 0;
    vm.totalPrice = function(Total, shipping){
        var price = parseFloat(shipping) + parseFloat(Total);
        return price;
    }
    
    // place order
    function placeOrder(shippingAddressId, shipping){
        // create order
        var newOrder = new PlaceOrdersService();
        newOrder._id = vm.orderId;
        newOrder.address = shippingAddressId;
        newOrder.shipping = shipping;
        newOrder.create()
                .then(successCallback)
                .catch(errorCallback);

        function successCallback(res) {
            console.log(vm.orderId);
            // redirect to order place view
            $state.go('placeorder',{orderId: vm.orderId}); 
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Order Placed Successfully!' });
        }

        function errorCallback(res) {
            Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Order place error!' });
        }         
    }
    
    // get random number for order Id
    function getRandomId(){
        return Math.floor((Math.random()*1000000000000000)+1);
    }
  }    
}());