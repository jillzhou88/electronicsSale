'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Purchased = mongoose.model('Purchased'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an purchased
 */
exports.create = function (req, res) {
  var purchased = new Purchased(req.body);
  

  purchased.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(purchased);
    }
  });
};

/**
 * Show the current purchased
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var purchased = req.purchased ? req.purchased.toJSON() : {};

  // Add a custom field to the Purchased, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Purchased model.
  purchased.isCurrentUserOwner = !!(req.user && purchased.user && purchased.user._id.toString() === req.user._id.toString());

  res.json(purchased);
};

/**
 * Update an purchased
 */
exports.update = function (req, res) {
  var purchased = req.purchased;

  purchased.title = req.body.title;
  purchased.content = req.body.content;

  purchased.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(purchased);
    }
  });
};

/**
 * Delete an purchased
 */
exports.delete = function (req, res) {
  var purchased = req.purchased;

  purchased.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(purchased);
    }
  });
};

/**
 * List of All Purchaseds
 */
exports.list = function (req, res) {
  Purchased.find()
      .where('order').equals(req.query.order)
      .sort('-created')
      .populate('product')
      .exec(function (err, orders) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(orders);
        }
  });
};

/**
 * Purchased middleware
 */
exports.purchasedByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Purchased is invalid'
    });
  }

  Purchased.findById(id).populate('user', 'displayName').exec(function (err, purchased) {
    if (err) {
      return next(err);
    } else if (!purchased) {
      return res.status(404).send({
        message: 'No purchased with that identifier has been found'
      });
    }
    req.purchased = purchased;
    next();
  });
};
