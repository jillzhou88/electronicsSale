'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cartitem Schema
 */
var CartitemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  },
  qty: {
    type: Number,
    default: 1,
    trim: true,
    required: 'Quantity cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Cartitem', CartitemSchema);
