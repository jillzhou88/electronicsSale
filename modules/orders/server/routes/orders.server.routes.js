'use strict';

/**
 * Module dependencies
 */
var ordersPolicy = require('../policies/orders.server.policy'),
  orders = require('../controllers/orders.server.controller'),
    purchaseds = require('../controllers/purchaseds.server.controller');

module.exports = function (app) {
  // Orders collection routes
  app.route('/api/orders').all(ordersPolicy.isAllowed)
    .get(orders.list);
    
  app.route('/api/settings/orders').all(ordersPolicy.isAllowed)
    .get(orders.userlist);

  // checkout collection routes
  app.route('/api/checkout').all(ordersPolicy.isAllowed)
    .post(orders.create);

  // Single order routes
  app.route('/api/orders/:orderId').all(ordersPolicy.isAllowed)
//    .get(purchaseds.list)
    .get(orders.read)
    .put(orders.update)
    .delete(orders.delete);

  // Finish by binding the order middleware
  app.param('orderId', orders.orderByID);
};
