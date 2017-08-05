'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Purchased Schema
 */
var PurchasedSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  order: {
    type: Number,
    ref: 'Order',
    required: 'orderId in purchased cannot be blank'
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product',
    required: 'product in purchased cannot be blank'
  },
  qty: {
    type: Number,
    required: "Quantity cannot be blank"
  }
});

mongoose.model('Purchased', PurchasedSchema);
