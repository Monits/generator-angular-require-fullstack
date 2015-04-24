define(['<%= appname %>'], function(<%= appname %>) {

	'use strict';
	<%= appname %>.controller('HomeCtrl', function($scope) {
		$scope.homePageText = 'This is your homepage';
	});
});
