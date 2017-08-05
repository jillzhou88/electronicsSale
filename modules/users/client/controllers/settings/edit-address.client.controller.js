(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditAddressController', EditAddressController);

  EditAddressController.$inject = ['$scope', '$http', '$location', 'UsersService', 'Authentication', 'Notification', 'AddressesService', '$state'];

  function EditAddressController($scope, $http, $location, UsersService, Authentication, Notification, AddressesService, $state) {
    var vm = this;

    vm.user = Authentication.user;
    vm.form = {};
    vm.save = save;
    vm.edit = edit;
    vm.remove = remove;
    vm.setDefault = setDefault;
      
    $scope.showAddForm = showAddForm;
    $scope.hide = hide;

    vm.addressList = AddressesService.query();
    
    // save address
    function save(isValid){
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.addressForm');
        return false;
      }
    
      if(vm.address._id){          
        var address = vm.address;          
      } 
      else {
        var address = new AddressesService();
        address.name = vm.address.name;
        address.address1 = vm.address.address1;
        address.address2 = vm.address.address2;
        address.city = vm.address.city;
        address.state = vm.address.state;
        address.zipcode = vm.address.zipcode;
        
        // if it is the first added address, set as default
        if(vm.addressList.length == 0){          
          address.isPrimary = true;
        }
      }
        
      // Create a new address, or update current address
      address.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $scope.hide();
        $state.go('settings.address'); 
        vm.addressList = AddressesService.query();
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Address saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Address save error!' });
      }
    };
      
      
    // edit address
    function edit(addressId){
        AddressesService.get({addressId: addressId})
          .$promise
          .then(function(data){
            vm.address = data;
            showAddForm();
        })
        
    };
      
    // remove address
    function remove(addressId){
        var address = AddressesService.get({addressId: addressId});
        address.$promise.then(function(data){
            data.$remove(function() {
              vm.addressList = AddressesService.query();
              $state.go('settings.address');
              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Product deleted successfully!' });
            });
        });
        
    };
      
    // set as default address
    function setDefault(addressId){
        // set current default address to false
        AddressesService.query({isPrimary: true})
          .$promise
          .then(function(data){
            var curDefault = data[0];
            
            curDefault.isPrimary = false;
            curDefault.$update();
            
        });
        
        // set chosen address to default
        AddressesService.get({addressId: addressId})
          .$promise
          .then(function(data){
            var address = data;
            address.isPrimary = true;
            
            address.createOrUpdate()
              .then(successCallback)
              .catch(errorCallback);

            function successCallback(res) {
              $state.go('settings.address'); 
              vm.addressList = AddressesService.query();
              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Address set as default!' });
              }

            function errorCallback(res) {
              Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Address set error!' });
            }
        })
    }
      
    // show add address form
    function showAddForm(){
        $scope.addFormShow = true;
    };
    
    // hide add/edit address form
    function hide(){
        $scope.addFormShow = false;
        
        clearFields();
    };
          
    //clear fields
    function clearFields(){        
        vm.address.name='';
        vm.address.address1='';
        vm.address.address2='';
        vm.address.city='';
        vm.address.state='';
        vm.address.zipcode='';
    };
  }
}());
