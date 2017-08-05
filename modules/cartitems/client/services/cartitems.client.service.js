(function () {
  'use strict';

  angular
    .module('cartitems.services')
    .factory('CartitemsService', CartitemsService)
    .service('UrlService', UrlService);
    

  CartitemsService.$inject = ['$resource', '$log'];

  function CartitemsService($resource, $log) {
    var Cartitem = $resource('/api/cartitems/:cartitemId', {
      cartitemId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Cartitem.prototype, {
      createOrUpdate: function () {
        var cartitem = this;
        return createOrUpdate(cartitem);
      }
    });

    return Cartitem;

    function createOrUpdate(cartitem) {
      if (cartitem._id) {
        return cartitem.$update(onSuccess, onError);
      } else {
        return cartitem.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(cartitem) {
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
  } // cartitem service ends
    
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
  } // UrlService ends
  
  
}());
