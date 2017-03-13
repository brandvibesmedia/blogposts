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
'use strict';

var siteContent = angular.module( 'jonas.content', [] );

siteContent.factory( "contentService", ['$http', '$q', '$timeout',
	function($http, $q) {

		var blogPosts = [];
		function getContent() {
			return $http.get('https://jsonplaceholder.typicode.com/posts').then( function success(response) {
				blogPosts = response.data;
				return blogPosts;
			}, function error(error) {
				return error.data;
			} );
		}

		var blogComments = [];
		function getPostComments() {
			return $http.get('https://jsonplaceholder.typicode.com/posts/1/comments').then( function success(response) {
				blogComments = response.data;
				return blogComments;
			}, function error(error) {
				return error.data;
			} );
		}

		return {
			getContent: getContent,
			getPostComments: getPostComments
		};
	}
] );
//# sourceMappingURL=jsapp.js.map
