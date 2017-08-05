'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cartitem = mongoose.model('Cartitem'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an cartitem
 */
exports.create = function (req, res) {
//    console.log(req.body);
  var cartitem = new Cartitem(req.body);
  cartitem.user = req.user;

//  console.log('enter create');
    
  cartitem.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cartitem);
    }
  });
};

/**
 * Show the current cartitem
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var cartitem = req.cartitem ? req.cartitem.toJSON() : {};

  // Add a custom field to the Cartitem, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Cartitem model.
//  cartitem.isCurrentUserOwner = !!(req.user && cartitem.user && cartitem.user._id.toString() === req.user._id.toString());

  res.json(cartitem);
};

/**
 * Update an cartitem
 */
exports.update = function (req, res) {
  var cartitem = req.cartitem;

  cartitem.product = req.body.product;
  cartitem.qty = req.body.qty;


  cartitem.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cartitem);
    }
  });
};

/**
 * Delete an cartitem
 */
exports.delete = function (req, res) {
  var cartitem = req.cartitem;
//   console.log(cartitem); 
  cartitem.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(cartitem);
    }
  });
};

/**
 * List of Cartitems
 */
exports.list = function (req, res) {    
    if(req.query.product != null){
        Cartitem.find({'product': mongoose.Types.ObjectId(req.query.product)})
          .where('user').equals(req.user._id)
          .sort('-created')
          .populate('product')
          .exec(function (err, cartitems) {
            if (err) {        
        //        console.log('error');
              return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {
                console.log(cartitems);
              res.json(cartitems);
            }
           });
        
    } else {
    
      Cartitem.find()
          .where('user').equals(req.user._id)
          .sort('-created')
          .populate('product')
          .exec(function (err, cartitems) {
        if (err) {        
    //        console.log('error');
          return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
    //        console.log(cartitems);
          res.json(cartitems);

        }
      });
    }
};

/**
 * Cartitem middleware
 */
exports.cartitemByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cartitem is invalid'
    });
  }

  Cartitem.findById(id).populate('product').exec(function (err, cartitem) {
    if (err) {
      return next(err);
    } else if (!cartitem) {
      return res.status(404).send({
        message: 'No cartitem with that identifier has been found'
      });
    }
    req.cartitem = cartitem;
    next();
  });
};
