'use strict';

/**
 * Module dependencies
 */
var purchaseds = require('../controllers/purchaseds.server.controller');

module.exports = function (app) {
  // Purchaseds collection routes
  app.route('/api/orders/:orderId/edit')
    .get(purchaseds.list);
    
  // Purchaseds for user
  app.route('/api/settings/orders/:orderId/view')
    .get(purchaseds.list);
    
  // checkout collection routes
  app.route('/api/placeorder')
    .post(purchaseds.create);

  // Single purchased routes
  app.route('/api/purchaseds/:purchasedId')
    .get(purchaseds.read)
    .put(purchaseds.update)
    .delete(purchaseds.delete);

  // Finish by binding the purchased middleware
  app.param('purchasedId', purchaseds.purchasedByID);
};
