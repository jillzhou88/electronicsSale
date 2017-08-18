(function () {
  'use strict';

  angular
    .module('products.services')
    .factory('ProductsService', ProductsService)
    .factory('ProductsSearch', ProductsSearch)
    .factory('DescriptionService', DescriptionService)
    .service('UrlService', UrlService);
    

  ProductsService.$inject = ['$resource', '$log'];

  function ProductsService($resource, $log) {
    var Product = $resource('/api/products/:productId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Product.prototype, {
      createOrUpdate: function () {
        var product = this;
        return createOrUpdate(product);
      }
    });

    return Product;

    function createOrUpdate(product) {
      if (product._id) {
        return product.$update(onSuccess, onError);
      } else {
        return product.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(product) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  } // product service ends
    
  ProductsSearch.$inject = ['$resource', '$log'];

  function ProductsSearch($resource, $log){
      var Products = $resource('/api/products/search');
      
      return Products;
  } // product search ends
    
  function DescriptionService(){
      var desSplit = function(description){
          var result = description.split('<br>');
          return result;
      }
      
      return {
          desSplit: desSplit
      };
  } // Description Service ends
    
  UrlService.$inject = ['$location'];

  function UrlService($location) {
    // refernce to service for callbacks
    var __service = this,
        parts = {
            "queryvars": {}
        },
        absUrl = $location.absUrl(),
        // extract and parse url
        elements = absUrl.split("?");

    // query string
    // parse quesry string
    parts["queryString"] = elements[1];
    if ( elements[1] ) {
	    parts["hashString"] = (parts["queryString"].split("#"))[1];
	    parts["requestParams"] = ((parts["queryString"].split("#"))[0]).split("&");
	    
	    parts["requestParams"].forEach(function(queryStringVariable) {
	        var __variable = queryStringVariable.split("=");
	        parts.queryvars[__variable[0]] = __variable[1];
	    });
    }
    // url
    parts["url"] = elements[0];


    // public interface
    // returns variable from query string
    this.getQueryStringVar = function(variable) {
        if (parts.queryvars[variable] !== "undefined") {
            return parts.queryvars[variable];
        }
        return false;
    };
  } //url service ends
    
  
}());
