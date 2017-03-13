'use strict';

var siteModule = angular.module( 'jonas.site', ['jonas.content'] );

siteModule.controller( 'SiteCtrl', ['$scope',
	function($scope) {
		$scope.page = 'home';
		$scope.$on('pageLoad', function(event, args) {
			$scope.page = args.page;
		});
	}
] );
siteModule.controller( 'HomeCtrl', ['$scope', '$rootScope', '$location', '$route', '$routeParams','contentService',
	function($scope, $rootScope, $location, $route, $routeParams, contentService) {

		$scope.blogPosts = [];
		$scope.currentPost = null;
		$scope.blogComments = [];

		contentService.getContent().then( function(res) {
			$scope.blogPosts = res;
			$scope.currentPost = res[0];
		} );

		if($route.current.templateUrl === 'src/includes/blog.html') { // inner page

			$rootScope.$broadcast('pageLoad', { page: 'inner' });

			contentService.getPostComments().then( function(res) {
				$scope.blogComments = res;
			} );

		} else {
			$rootScope.$broadcast('pageLoad', { page: 'home' });
		}

	}
] );