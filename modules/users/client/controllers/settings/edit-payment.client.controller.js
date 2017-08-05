(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditPaymentController', EditPaymentController);

  EditPaymentController.$inject = ['$scope', 'UsersService', 'Authentication', 'Notification', '$state', 'PaymentsService'];

  function EditPaymentController($scope, UsersService, Authentication, Notification, $state, PaymentsService) {
//    var vm = this;
//
//    vm.user = Authentication.user;
//    vm.form = {};
//    vm.save = save;
//    vm.edit = edit;
//    vm.remove = remove;
//    vm.setDefault = setDefault;
//      
//    $scope.showAddForm = showAddForm;
//    $scope.hide = hide;
//    $scope.month = '0';
//    $scope.year = '0';
//        
//        
//    
////    vm.paymentList = PaymentsService.query();
////      console.log(PaymentsService.query());
//    
//    // save payment
//    function save(isValid){
//      if (!isValid) {
//        $scope.$broadcast('show-errors-check-validity', 'vm.form.paymentForm');
//        return false;
//      }
//    
//      if(vm.payment._id){          
//        var payment = vm.payment;          
//      } 
//      else {
//        var payment = new PaymentsService();
//          console.log(payment);
//        payment.name = vm.payment.name;
//        payment.number = vm.payment.number;
//        payment.expireDate = $scope.month + '/' + $scope.year;
//        payment.code = vm.payment.code;
//        
//        // if it is the first added payment, set as default
////        if(vm.paymentList.length == 0){          
////          payment.isPrimary = true;
////        }
//      }
//        
//      // Create a new payment, or update current payment
//      payment.createOrUpdate()
//        .then(successCallback)
//        .catch(errorCallback);
//
//      function successCallback(res) {
//        $scope.hide();
//        $state.go('settings.payment'); 
//        vm.paymentList = PaymentsService.query();
//        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Payment saved successfully!' });
//      }
//
//      function errorCallback(res) {
//        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Payment save error!' });
//      }
//    };
//      
//      
//    // edit payment
//    function edit(paymentId){
//        PaymentsService.get({paymentId: paymentId})
//          .$promise
//          .then(function(data){
//            vm.payment = data;
//            showAddForm();
//        })
//        
//    };
//      
//    // remove payment
//    function remove(paymentId){
//        var payment = PaymentsService.get({paymentId: paymentId});
//        payment.$promise.then(function(data){
//            data.$remove(function() {
//              vm.paymentList = PaymentsService.query();
//              $state.go('settings.payment');
//              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Payment deleted successfully!' });
//            });
//        });
//        
//    };
//      
//    // set as default payment
//    function setDefault(paymentId){
//        // set current default payment to false
//        PaymentsService.query({isPrimary: true})
//          .$promise
//          .then(function(data){
//            var curDefault = data[0];
//            
//            curDefault.isPrimary = false;
//            curDefault.$update();
//            
//        });
//        
//        // set chosen payment to default
//        PaymentsService.get({paymentId: paymentId})
//          .$promise
//          .then(function(data){
//            var payment = data;
//            payment.isPrimary = true;
//            
//            payment.createOrUpdate()
//              .then(successCallback)
//              .catch(errorCallback);
//
//            function successCallback(res) {
//              $state.go('settings.payment'); 
//              vm.paymentList = PaymentsService.query();
//              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Payment set as default!' });
//              }
//
//            function errorCallback(res) {
//              Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Payment set error!' });
//            }
//        })
//    }
//      
//    // show add payment form
//    function showAddForm(){
//        $scope.addFormShow = true;
//    };
//    
//    // hide add/edit payment form
//    function hide(){
//        $scope.addFormShow = false;
//        
//        clearFields();
//    };
//          
//    //clear fields
//    function clearFields(){        
//        vm.payment.cardHolder='';
//        vm.payment.cardNumber='';
//        vm.payment.expireDate='';
//        vm.payment.securityCode='';
//    };
//  }
}}());
