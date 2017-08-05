'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Payment = mongoose.model('Payment'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an payment
 */
exports.create = function (req, res) {
  var payment = new Payment(req.body);
  payment.user = req.user;

  payment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(payment);
    }
  });
};

/**
 * Show the current payment
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var payment = req.payment ? req.payment.toJSON() : {};

  // Add a custom field to the Payment, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Payment model.
  payment.isCurrentUserOwner = !!(req.user && payment.user && payment.user._id.toString() === req.user._id.toString());

  res.json(payment);
};

/**
 * Update an payment
 */
exports.update = function (req, res) {
  var payment = req.payment;

  payment.name = req.body.name;
  payment.payment1 = req.body.payment1;
  payment.payment2 = req.body.payment2;
  payment.city = req.body.city;
  payment.state = req.body.state;
  payment.zipcode = req.body.zipcode;
  payment.isPrimary = req.body.isPrimary;

  payment.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(payment);
    }
  });
};

/**
 * Delete an payment
 */
exports.delete = function (req, res) {
  var payment = req.payment;

  payment.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(payment);
    }
  });
};

/**
 * List of All Payments
 */
exports.list = function (req, res) {
  Payment.find(req.query)
      .where('user').equals(req.user._id)      
      .sort('-isPrimary')
      .populate('payment')
      .exec(function (err, payments) {
        if (err) {
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          res.json(payments);
        }
      });
};

/**
 * Payment middleware
 */
exports.paymentByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Payment is invalid'
    });
  }

  Payment.findById(id).populate('user', 'displayName').exec(function (err, payment) {
    if (err) {
      return next(err);
    } else if (!payment) {
      return res.status(404).send({
        message: 'No payment with that identifier has been found'
      });
    }
    req.payment = payment;
    next();
  });
};
