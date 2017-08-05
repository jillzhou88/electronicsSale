(function () {
  'use strict';

  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', 'productResolve', 'Authentication', 'DescriptionService', 'CartitemsService', '$state', 'Notification'];

  function ProductsController($scope, product, Authentication, DescriptionService, CartitemsService, $state, Notification) {
    var vm = this;

    vm.product = product;
    vm.authentication = Authentication;
    
    $scope.descriptions = DescriptionService.desSplit(vm.product.description);
    
    // check if customer already added item in cart
    var query = {};
    query.product = vm.product._id;
//      console.log(query);
    $scope.addToCart = function(){
        var item = CartitemsService.query(query);
//        console.log('add goes here');
        item.$promise.then(function(data){
            if(data[0] == null){
//            console.log('add enter item == null');
            var newItem = new CartitemsService();
            newItem.product = vm.product;
            newItem.qty = 1;            

            newItem.createOrUpdate()
                .then(successCallback)
                .catch(errorCallback);

              function successCallback(res) {
                $state.go('cartitems.list'); // should we send the User to the list or the updated Cartitem's view?
                Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully Add To Cart!' });
              }

              function errorCallback(res) {
                Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Cartitem save error!' });
              }
          } else {
              console.log('unsuccess');
              $state.go('cartitems.list'); 
          }
      });
        
      }
  }
}());
