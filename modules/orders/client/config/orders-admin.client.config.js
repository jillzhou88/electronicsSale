(function () {
  'use strict';

  // Configuring the Orders Admin module
  angular
    .module('orders.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Orders',
      state: 'admin.orders.list'
    });
  }
}());
