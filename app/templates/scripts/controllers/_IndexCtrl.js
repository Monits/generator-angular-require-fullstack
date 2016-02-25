'use strict';
define(['<%= appname %>'], function(<%= appname %>) {

	<%= appname %>.controller('IndexCtrl', function($scope) {
		$scope.welcomeText = 'Welcome to your <%= appname %> page';
	});
});
