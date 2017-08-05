'use strict';

/**
 * Module dependencies
 */
var cartitemsPolicy = require('../policies/cartitems.server.policy'),
  cartitems = require('../controllers/cartitems.server.controller');

module.exports = function (app) {
  // Shoppingcart collection routes
  app.route('/api/cartitems').all(cartitemsPolicy.isAllowed)
    .get(cartitems.list)
    .post(cartitems.create)
    .get(cartitems.read)
    .put(cartitems.update)
    .delete(cartitems.delete);
    
    
  // Single car routes
  app.route('/api/cartitems/:cartitemId').all(cartitemsPolicy.isAllowed)
    .get(cartitems.read)
    .put(cartitems.update)
    .delete(cartitems.delete);

  // Finish by binding the product middleware
  app.param('cartitemId', cartitems.cartitemByID);
};
