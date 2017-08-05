'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Shoppingcart Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/cartitems',
      permissions: '*'
    }, {
      resources: '/api/cartitems/:cartitemId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/cartitems',
      permissions: '*'
    }, {
      resources: '/api/cartitems/:cartitemId',
      permissions: '*'  
    }]
  }]);
};

/**
 * Check If Shoppingcart Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
  console.log(roles);
  // If an cartitem is being processed and the current user created it then allow any manipulation
  if (req.cartitem && req.user && req.cartitem.user && req.cartitem.user.id === req.user.id) {
     //console.log(roles);
    return next();
  }
  
  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
        //console.log(roles);
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
          //console.log(roles);
          //console.log(req.isAllowed);
        // Access granted! Invoke next middleware
        return next();
      } else {
          //console.log(req.isAllowed);
          //console.log(roles);
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
