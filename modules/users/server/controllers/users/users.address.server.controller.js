'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Address = mongoose.model('Address'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an address
 */
exports.create = function (req, res) {
  var address = new Address(req.body);
  address.user = req.user;

  address.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(address);
    }
  });
};

/**
 * Show the current address
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var address = req.address ? req.address.toJSON() : {};

  // Add a custom field to the Address, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Address model.
  address.isCurrentUserOwner = !!(req.user && address.user && address.user._id.toString() === req.user._id.toString());

  res.json(address);
};

/**
 * Update an address
 */
exports.update = function (req, res) {
  var address = req.address;

  address.name = req.body.name;
  address.address1 = req.body.address1;
  address.address2 = req.body.address2;
  address.city = req.body.city;
  address.state = req.body.state;
  address.zipcode = req.body.zipcode;
  address.isPrimary = req.body.isPrimary;

  address.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(address);
    }
  });
};

/**
 * Delete an address
 */
exports.delete = function (req, res) {
  var address = req.address;

  address.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(address);
    }
  });
};

/**
 * List of All Addresss
 */
exports.list = function (req, res) {
  Address.find(req.query)
      .where('user').equals(req.user._id)      
      .sort('-isPrimary')
      .populate('address')
      .exec(function (err, addresses) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(addresses);
        }
      });
};

/**
 * Address middleware
 */
exports.addressByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Address is invalid'
    });
  }

  Address.findById(id).populate('user', 'displayName').exec(function (err, address) {
    if (err) {
      return next(err);
    } else if (!address) {
      return res.status(404).send({
        message: 'No address with that identifier has been found'
      });
    }
    req.address = address;
    next();
  });
};
