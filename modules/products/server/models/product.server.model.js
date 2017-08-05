'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  productName: {
    type: String,
    default: '',
    trim: true,
    required: 'Product name cannot be blank'
  },
  category: {
    type: String,
    default: '',
    trim: true,
    required: 'Category cannot be blank'
  },
  qty: {
    type: Number,
    default: 0,
    trim: true,
    required: 'Quantity cannot be blank'
  },
  price: {
    type: Number,
    default: 0,
    trim: true,
    required: 'Price cannot be blank'
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  image_url: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Product', ProductSchema);
