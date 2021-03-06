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
			$routeProvider.when('/login', {templateUrl:'htmls/login.html', controller:'userMgmtCtrl'});
			$routeProvider.when('/logout', {templateUrl:'htmls/login.html', controller:'userMgmtCtrl'});
			$routeProvider.when('/main', {templateUrl:'htmls/main.html', controller:'userMgmtCtrl'});
			$routeProvider.when('/userFavor', {templateUrl:'htmls/userCenter.html', controller:'favorMgmtCtrl'});
		}
	]
);
