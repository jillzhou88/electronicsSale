(function () {
  'use strict';

  angular
    .module('cartitems')
    .controller('CartitemsListController', CartitemsListController);

  CartitemsListController.$inject = ['CartitemsService', '$state', 'Notification', '$scope'];

  function CartitemsListController(CartitemsService, $state, Notification, $scope) {
    var vm = this;
    
    vm.Total = 0;
    vm.itemTotalQty = 0;
    vm.remove = remove;
    vm.changeQty = changeQty;
      
    // get list of shopping cart items
    vm.cartitems = CartitemsService.query();
//      console.log(vm.cartitems);
    
    // delete single item
    function remove(itemId){        
        var item = CartitemsService.get({cartitemId: itemId});
        item.$promise.then(function(data){
            vm.getCartitem = data;

            vm.getCartitem.$remove(function() {
                vm.Total = 0;
                vm.itemTotalQty = 0;
                vm.cartitems = CartitemsService.query();
                $state.go('cartitems.list');                
                Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cartitem deleted successfully!' });
            });
        });       
     }
      
      // update qty
      function changeQty(itemId, qty){
          var item = CartitemsService.get({cartitemId: itemId});
          
          item.$promise.then(function(data){
            vm.getCartitem = data;
            qty = parseInt(qty);
            vm.getCartitem.qty = qty;
        
            vm.getCartitem.$update(function(){
                vm.Total = 0;
                vm.itemTotalQty = 0;
                vm.cartitems = CartitemsService.query();
                $state.go('cartitems.list'); 
                Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully Update Quantity!' });
            });
          }); 
      }
      
  }
}());
