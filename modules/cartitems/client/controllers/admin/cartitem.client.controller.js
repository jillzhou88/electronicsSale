(function () {
  'use strict';

  angular
    .module('cartitems.admin')
    .controller('CartitemsAdminController', CartitemsAdminController);

  CartitemsAdminController.$inject = ['$scope', '$state', '$window', 'cartitemResolve', 'Authentication', 'Notification', 'UrlService'];

  function CartitemsAdminController($scope, $state, $window, cartitem, Authentication, Notification, UrlService) {
    var vm = this;
      
    vm.cartitem = cartitem;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    console.log(vm.cartitem);
      
//    vm.form.product = UrlService.getQueryStringVar('product');
//    vm.form.qty = UrlService.getQueryStringVar('qty');
//    console.log(vm.form);
      
    // Remove existing Cartitem
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cartitem.$remove(function() {
          $state.go('admin.cartitems.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cartitem deleted successfully!' });
        });
      }
    }

    // Save Cartitem
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.cartitemForm');
        return false;
      }
        //console.log(typeof(cartitem.product));
      // Create a new cartitem, or update the current instance
      vm.cartitem.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.cartitems.list'); // should we send the User to the list or the updated Cartitem's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Cartitem saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Cartitem save error!' });
      }
    }
      
//    vm.save(true);
  }
}());
