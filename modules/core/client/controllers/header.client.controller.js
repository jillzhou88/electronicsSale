(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', 'CartitemsService'];

  function HeaderController($scope, $state, Authentication, menuService, CartitemsService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
      //console.log(menuService.getMenu('account'));
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());
