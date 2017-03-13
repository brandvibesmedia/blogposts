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