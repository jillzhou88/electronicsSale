(function (app) {
  'use strict';

  app.registerModule('cartitems', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('cartitems.admin', ['core.admin']);
  app.registerModule('cartitems.admin.routes', ['core.admin.routes']);
  app.registerModule('cartitems.services');
  app.registerModule('cartitems.routes', ['ui.router', 'core.routes', 'cartitems.services']);
}(ApplicationConfiguration));
