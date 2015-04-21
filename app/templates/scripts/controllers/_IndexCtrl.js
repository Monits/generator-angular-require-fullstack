define(['<%= appname %>'], function(<%= appname %>) {

	'use strict';
	<%= appname %>.controller('IndexCtrl', function($scope) {
		$scope.welcomeText = "Welcome to your <%= appname %> page";
	});

});