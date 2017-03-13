'use strict';

var appModule = angular.module( 'jonas', ['ngRoute','jonas.site','jonas.content'] );
appModule.config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'src/includes/home.html',
		controller: 'HomeCtrl'
	})
	.when('/blog', {
		templateUrl: 'src/includes/blog.html',
		controller: 'HomeCtrl'
	});
	$routeProvider.otherwise( {
		redirectTo: '/',
		controller: 'HomeCtrl'
	} );
	$locationProvider.html5Mode(true);
}] );