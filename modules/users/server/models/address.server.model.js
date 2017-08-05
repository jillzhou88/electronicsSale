'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Address Schema
 */
var AddressSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    required: 'name cannot be blank'  
  },
  address1: {
    type: String,
    default: '',
    required: 'address cannot be blank'  
  },
  address2: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: '',
    required: 'city cannot be blank'  
  },
  state: {
    type: String,
    default: '',
    required: 'state cannot be blank'  
  },
  zipcode: {
    type: Number,
    default: '',
    required: 'zipcode cannot be blank'
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

mongoose.model('Address', AddressSchema);
