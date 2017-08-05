'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  _id: {
    type: Number,
    required: 'orderId cannot be blank'
  },
//  payment: {
//    type: Schema.ObjectId,
//    ref: 'Payment',
//    default: '',
//    trim: true,
//    required: 'payment information cannot be blank'
//  },
  address: {
    type: Schema.ObjectId,
    ref: 'Address',
    required: 'shipping address cannot be blank'
  },
  shipping: {
    type: Number,
    default: 0,
    required: 'shipping method cannot be blank'
  },
  order_status: {
    type: String,
    default: 'placed'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Order', OrderSchema);
