'use strict';
define(['<%= appname %>'], function(<%= appname %>) {

	<%= appname %>.directive('sample', function() {
		return {
			restrict: 'E',
			template: '<span>Sample</span>'
		};
	});
});
