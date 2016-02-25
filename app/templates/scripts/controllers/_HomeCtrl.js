'use strict';
define(['<%= appname %>'], function(<%= appname %>) {

	<%= appname %>.controller('HomeCtrl', function($scope) {
		$scope.homePageText = 'This is your homepage';
	});
});
