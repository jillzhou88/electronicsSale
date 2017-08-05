'use strict';

/**
 * Module dependencies
 */
var payment = require('../controllers/users/users.payment.server.controller');

module.exports = function (app) {
  // Payment collection routes
  app.route('/api/users/payment')
    .get(payment.list)
    .post(payment.create);
    
  // Single payment routes
  app.route('/api/users/payment/:paymentId')
    .get(payment.read)
    .put(payment.update)
    .delete(payment.delete);

  // Finish by binding the payment middleware
  app.param('paymentId', payment.paymentByID);
};
