'use strict';

var sqm = angular.module('soqu', 
	[
		'ngRoute',
		'soqu.userMgmtController'
	]
);

sqm.config(
	[
		'$routeProvider',
		function($routeProvider)
		{
			//$routeProvider.when('/', {templateUrl:'views/index.ejs', controller:'userMgmtCtrl'});
			$routeProvider.when('/reg', {templateUrl:'htmls/reg.html', controller:'userMgmtCtrl'});
		}
	]
);
