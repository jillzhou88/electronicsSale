'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Payment Schema
 */
var PaymentSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'name cannot be blank'  
  },
  number: {
    type: Number,
    required: 'number cannot be blank'  
  },
  expireDate: {
    type: String,
    required: 'expire date cannot be blank'  
  },
  code: {
    type: Number,
    required: 'number cannot be blank'  
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Payment', PaymentSchema);
