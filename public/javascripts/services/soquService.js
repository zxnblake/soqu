'use strict';

/* Services */
angular.module('soqu.services', ['ngResource']).
  factory('soquService', ['$resource', function ($resource) {
	  var actions = 
	  { 
		  'register': {method:'POST', url:'register/'},
		  'login': {method:'POST', url:'login/'}
      };
	  
      return $resource("/", null, actions );      

  }]);

