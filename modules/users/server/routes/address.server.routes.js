'use strict';

/**
 * Module dependencies
 */
var address = require('../controllers/users/users.address.server.controller');

module.exports = function (app) {
  // Addresss collection routes
  app.route('/api/users/address')
    .get(address.list)
    .post(address.create);
    
  // Single address routes
  app.route('/api/users/address/:addressId')
    .get(address.read)
    .put(address.update)
    .delete(address.delete);

  // Finish by binding the address middleware
  app.param('addressId', address.addressByID);
};
